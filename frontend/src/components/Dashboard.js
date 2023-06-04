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

var INITIAL_SORT_BY = null

const Dashboard = ({ user, handleLogout, handleTimeout }) => {

  const [newSymbol, setNewSymbol] = useState('')
  const [newQuantity, setNewQuantity] = useState('') 
  const [stocks, setStocks] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await stockService.getAll()
        const initialStocks = response.slice(0, -1)     
        INITIAL_SORT_BY = response.pop()
        setStocks(sortStocks(initialStocks, INITIAL_SORT_BY))
        setSortBy(INITIAL_SORT_BY)
        const initialSymbols = initialStocks.map(s => s.symbol)
        const latestTrades = await tradeService.getLatestTrades(initialSymbols)
        for (const s of initialStocks) {
          s.price = latestTrades[s.symbol].Price
        }
        setStocks(sortStocks(initialStocks, INITIAL_SORT_BY))
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
      const newSymbolUpper = newSymbol.toUpperCase()
      const stock = stocks.find(s => s.symbol === newSymbolUpper)
      if (stock) {
        const newObject = {
          ...stock,
          quantity: stock.quantity + parseInt(newQuantity)
        }
        const updatedStock = await stockService.update(stock.id, newObject)
        // Might lead to unnecessary sorting, but doing checks leads to more convoluted code
        setStocks(sortStocks(stocks.map(s => s.id !== stock.id ? s : updatedStock), sortBy))
      } else {
        const newObject = {
          symbol: newSymbolUpper,
          quantity: newQuantity
        }
        const newStock = await stockService.create(newObject)
        setStocks(sortStocks(stocks.concat(newStock), sortBy))
      }
      setNewSymbol('')
      setNewQuantity('')
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
        // Might lead to unnecessary sorting, but doing checks leads to more convoluted code
        setStocks(sortStocks(stocks.map(s => s.id !== id ? s : updatedStock), sortBy))
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

  const sortStocksAndUpdate = async (s, sb) => {
    INITIAL_SORT_BY = sb
    const sortedStocks = sortStocks([ ...s ], sb)
    setStocks(sortedStocks)
    setSortBy(sb)
    const newObject = {
      sortBy: sb
    }
    await userService.update(user.id, newObject)
  }

  const checkLoading = (stocks) => {
    if (!stocks.length) {
      return false
    }
    for (const stock of stocks) {
      if (!stock.price) {
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
        stocks={stocks}
        sortBy={sortBy}
        deleteStock={deleteStock}
        handleQuantityChange={handleQuantityChange}
        updateQuantity={updateQuantity}
        sortStocksAndUpdate={sortStocksAndUpdate}
      />
      <p>{!checkLoading(stocks) ? `Total portfolio value = $${stocks.reduce((total, stock) => (total + stock.quantity * stock.price), 0).toFixed(2)}` : `Loading price data...`}</p>
      <Analysis
        stocks={stocks} 
      />
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