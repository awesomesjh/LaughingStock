import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stock from './Stock'
import Notification from './Notification'
import stockService from '../services/stocks'

const Dashboard = ({ user, handleLogout, handleTimeout }) => {

  const [newSymbol, setNewSymbol] = useState('')
  const [newQuantity, setNewQuantity] = useState('') 
  const [stocks, setStocks] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const initialStocks = await stockService.getAll()
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
      if (newQuantity < 1 || newQuantity.includes('.')) {
        throw new Error('invalid quantity')
      }
      const newObject = {
        symbol: newSymbol,
        quantity: newQuantity
      }
      const newStock = await stockService.create(newObject)
      setStocks(stocks.concat(newStock))
      setNewSymbol('')
      setNewQuantity('')
    } catch (error) {
      if (error.message === 'empty field') {
        setMessage('Data not saved. Symbol and quantity cannot be empty')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.message === 'invalid quantity') {
        setMessage('Data not saved. Quantity must be a positive integer')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
  }

  const deleteStock = async (stockId) => {
    try {
      await stockService.remove(stockId)
      const filteredStocks = stocks.filter(stock => stock.id !== stockId)
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
    const changedStock = { ...stock, quantity: event.target.value }
    setStocks(stocks.map(s => s.id !== id ? s : changedStock))
  }

  const updateQuantity = async (id) => {
    const stock = stocks.find(s => s.id === id)
    try {
      if (stock.quantity === '') {
        throw new Error('empty field')
      }
      if (stock.quantity < 1 || stock.quantity.includes('.')) {
        throw new Error('invalid quantity')
      }
      const updatedStock = await stockService.update(id, stock)
      setStocks(stocks.map(s => s.id !== id ? s : updatedStock))
      setMessage('Quantity has been successfully updated')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.message === 'empty field') {
        setMessage('Data not saved. Quantity cannot be empty')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.message === 'invalid quantity') {
        setMessage('Data not saved. Quantity must be a postive integer')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
    /*
    console.log(event.target)
    const { name, value } = event.target

    const editData = stocks.map((stock) =>
      stock.symbol === symbol && name ? { ...stock, [name]: value } : stock
    )

    setStocks(editData)
    */
  }

  return (
    <main>
      <div className="heading">
        <h2>Welcome to Laughing Stock, {user.username}!</h2>
        <Button className="logout" variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) =>
            <Stock 
              key={stock.id}
              stock={stock}
              deleteStock={deleteStock}
              handleQuantityChange={handleQuantityChange}
              updateQuantity={updateQuantity}
            />
          )}
        </tbody>
      </Table>
      <p>Total portfolio value = ${stocks.reduce((total, stock) => (total + stock.quantity * 120), 0).toLocaleString("en-US")}</p>
      <h2>Add new stock</h2>
      <Form onSubmit={addStock}>
        <Form.Group className="mb-3" controlId="formStock">
          <Form.Label>Symbol</Form.Label>
          <Form.Control type="text" value={newSymbol} onChange={handleNewSymbolChange} placeholder="Enter Symbol" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" value={newQuantity} onChange={handleNewQuantityChange} placeholder="Enter Quantity" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>

      <Notification message={message} />
    </main>
  )
}

export default Dashboard