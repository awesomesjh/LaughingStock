import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import StockTable from './StockTable'
import StockForm from './StockForm'
import Notification from './Notification'
import stockService from '../services/stocks'
import tradeService from '../services/trades'
import userService from '../services/users'
import sortStocks from '../util/sortStocks'
import styles from './Dashboard.module.css'
import Analysis from './Analysis'

const Dashboard = ({ user, handleLogout, handleTimeout }) => {

  const [newSymbol, setNewSymbol] = useState('')
  const [newQuantity, setNewQuantity] = useState('')
  const [stocks, setStocks] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [trades, setTrades] = useState({})
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await stockService.getAll()
        const initialStocks = response.slice(0, -1)
        const initialSortBy = response.pop()
        setStocks(initialStocks)
        setSortBy(initialSortBy)
        const initialSymbols = initialStocks.map(s => s.symbol)
        if (initialStocks.length) {
          const latestTrades = await tradeService.getLatestTrades(initialSymbols)
          setTrades(latestTrades)
        }
      } catch (error) {
        if (error.response.data.error === 'token invalid') {
          handleTimeout()
        }
      }
    }
    fetchStocks()
  }, [handleTimeout])

  

  const handleNewSymbolChange = (event) => {
    setNewSymbol(event.target.value)
  }

  const handleNewQuantityChange = (event) => {
    setNewQuantity(event.target.value)
  }

  const addStock = async (event) => {
    event.preventDefault()
    try {
      if (newSymbol === '' || newQuantity === '') {
        throw new Error('empty field')
      }
      const newQuantityCopy = newQuantity
      const newSymbolUpper = newSymbol.toUpperCase()
      setNewSymbol('')
      setNewQuantity('')
      const stock = stocks.find(s => s.symbol === newSymbolUpper)
      if (stock) {
        const newObject = {
          ...stock,
          quantity: stock.quantity + parseInt(newQuantityCopy)
        }
        const updatedStock = await stockService.update(stock.id, newObject)
        setStocks(stocks.map(s => s.id !== stock.id ? s : updatedStock))
      } else {
        const newObject = {
          symbol: newSymbolUpper,
          quantity: newQuantityCopy
        }
        const newStock = await stockService.create(newObject)
        const newStocks = stocks.concat(newStock)
        setStocks(newStocks)
        const newSymbols = newStocks.map(s => s.symbol)
        const latestTrades = await tradeService.getLatestTrades(newSymbols)
        if (!latestTrades[newSymbolUpper]) {
          await stockService.remove(newStock.id)
          const filteredStocks = newStocks.filter(stock => stock.id !== newStock.id)
          setStocks(filteredStocks)
          throw new Error('invalid symbol')
        }
        setTrades(latestTrades)
      }
      setMessage('Stock successfully added')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.message === 'empty field') {
        setMessage('Data not saved. Symbol and quantity cannot be empty')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.message === 'invalid symbol') {
        setMessage('Stock not found')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deleteStock = async (id) => {
    try {
      await stockService.remove(id)
      const filteredStocks = stocks.filter(stock => stock.id !== id)
      setStocks(filteredStocks)
      const stock = stocks.find(s => s.id === id)
      const filteredTrades = { ...trades }
      delete filteredTrades[stock.symbol]
      setTrades(filteredTrades)
      setMessage('Stock successfully deleted')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
  }

  const handleQuantityChange = (event, id) => {
    const stock = stocks.find(s => s.id === id)
    const changedStock = { ...stock, quantity: event.target.value === '' ? '' : Number(event.target.value) }
    setStocks(stocks.map(s => s.id !== id ? s : changedStock))
  }

  const updateQuantity = async (id) => {
    const stock = stocks.find(s => s.id === id)
    try {
      if (stock.quantity === '') {
        throw new Error('empty field')
      }
      if (stock.quantity === 0) {
        await stockService.remove(id)
        const filteredStocks = stocks.filter(stock => stock.id !== id)
        setStocks(filteredStocks)
        setMessage('Stock successfully deleted')
      } else {
        const updatedStock = await stockService.update(id, stock)
        setStocks(stocks.map(s => s.id !== id ? s : updatedStock))
        setMessage('Quantity has been successfully updated')
      }
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.message === 'empty field') {
        setMessage('Data not saved. Quantity cannot be empty')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
  }

  const sortStocksAndUpdate = async (sb) => {
    setSortBy(sb)
    const newObject = {
      sortBy: sb
    }
    await userService.update(user.id, newObject)
  }

  const loading = () => {
    for (const stock of stocks) {
      if (!trades[stock.symbol]) {
        return true
      }
    }
    return false
  }

  return (
    <main>
      <div className={styles.welcome}>
        <h2>Welcome to Laughing Stock, {user.username}!</h2>
        <Button className={styles.logout} variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <StockTable
        stocks={sortStocks([ ...stocks ], sortBy)}
        sortBy={sortBy}
        trades={trades}
        deleteStock={deleteStock}
        handleQuantityChange={handleQuantityChange}
        updateQuantity={updateQuantity}
        sortStocksAndUpdate={sortStocksAndUpdate}
      />
      <Analysis
        stocks={sortStocks([ ...stocks ], sortBy)}
        trades={trades}
      />
      <p>
        {loading()
          ? `Loading price data...`
          : `Total portfolio value = $${stocks.reduce((total, stock) => (total + stock.quantity * trades[stock.symbol].Price), 0).toFixed(2)}`}
      </p>
      <h2>Add new stock</h2>
      <StockForm
        addStock={addStock}
        newSymbol={newSymbol}
        handleNewSymbolChange={handleNewSymbolChange}
        newQuantity={newQuantity}
        handleNewQuantityChange={handleNewQuantityChange}
      />
      <Notification message={message} />
    </main>
  )
}

export default Dashboard