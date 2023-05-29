import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import StockTable from './StockTable'
import StockForm from './StockForm'
import Notification from './Notification'
import stockService from '../services/stocks'
import compareBySymbol from '../util/compareBySymbol'
import styles from './Dashboard.module.css'

const Dashboard = ({ user, handleLogout, handleTimeout }) => {

  const [newSymbol, setNewSymbol] = useState('')
  const [newQuantity, setNewQuantity] = useState('') 
  const [stocks, setStocks] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const initialStocks = await stockService.getAll()
        initialStocks.sort(compareBySymbol)
        setStocks(initialStocks)
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
        setStocks(stocks.map(s => s.id !== stock.id ? s : updatedStock))
      } else {
        const newObject = {
          symbol: newSymbolUpper,
          quantity: newQuantity
        }
        const newStock = await stockService.create(newObject)
        setStocks(stocks.concat(newStock).sort(compareBySymbol))
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

  const sortSymbolDescending = () => {
    const sortedStocks = [...stocks].sort(compareBySymbol).reverse()
    setStocks(sortedStocks)
  }

  const sortSymbolAscending = () => {
    const sortedStocks = [...stocks].sort(compareBySymbol)
    setStocks(sortedStocks)
  }

  const sortQuantityDescending = () => {
    const sortedStocks = [...stocks].sort((a, b) => b.quantity - a.quantity)
    setStocks(sortedStocks)
  }

  const sortQuantityAscending = () => {
    const sortedStocks = [...stocks].sort((a, b) => a.quantity - b.quantity)
    setStocks(sortedStocks)
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
        deleteStock={deleteStock}
        handleQuantityChange={handleQuantityChange}
        updateQuantity={updateQuantity}
        sortSymbolDescending={sortSymbolDescending}
        sortSymbolAscending={sortSymbolAscending}
        sortQuantityDescending={sortQuantityDescending}
        sortQuantityAscending={sortQuantityAscending}
      />
      <p>Total portfolio value = ${stocks.reduce((total, stock) => (total + stock.quantity * 120), 0).toLocaleString("en-US")}</p>
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