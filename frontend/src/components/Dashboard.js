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
      if (newQuantity < 1) {
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
        setMessage('Symbol and quantity cannot be empty')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      else if (error.message === 'invalid quantity') {
        setMessage('Quantity cannot be less than 1')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      else if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
  }

  const deleteStock = async (stockId) => {
    try {
      await stockService.remove(stockId)
      const filteredStocks = stocks.filter(stock => stock.id !== stockId)
      setStocks(filteredStocks)
    } catch (error) {
      if (error.response.data.error === 'token invalid') {
        handleTimeout()
      }
    }
  }

  return (
    <main>
      <h2>Welcome to Laughing Stock, {user.username}!</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => 
            <Stock key={stock.id} stock={stock} deleteStock={deleteStock} />
          )}
        </tbody>
      </Table>

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

      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </main>
  )
}

export default Dashboard