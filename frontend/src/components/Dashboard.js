import Table from 'react-bootstrap/Table'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Dashboard = ({ user, handleLogout }) => {
  const defaultStocks = [
    {
      stock: "Tsla",
      quantity: 2,
      price: 184.47
    },
    {
      stock: "Amazon",
      quantity: 1,
      price: 115.
    },
    {
      stock: "Netflix",
      quantity: 3,
      price: 359.
    }
  ]

  const [newStock, setNewStock] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [stocks, setStocks] = useState(defaultStocks)

  const handleNewStockChange = (event) => {
    setNewStock(event.target.value)
  }

  const handleNewStockQuantity = (event) => {
    setNewQuantity(event.target.value)
  }

  const handleNewStockSubmit = (event) => {
    event.preventDefault()
    setStocks([
      {
        stock: newStock,
        quantity: newQuantity,
        price: newPrice,
      },
      ...stocks
    ])
    setNewStock("")
    setNewPrice("")
    setNewQuantity("")
  }

  const handleDeleteStock = (stockName) => {
    const newStockslist = stocks.filter( li => li.stock !== stockName)
    setStocks(newStockslist)
  }

  return (
    <main>
      <h2>Welcome to Laughing Stock, {user.username}!</h2>
      <b></b>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Stock</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stocks, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{stocks.stock}</td>
                <td>{stocks.quantity}</td>
                <td>{stocks.price}</td>
                <td>{stocks.quantity * stocks.price}</td>
                <td>
                  <button type='button' onClick={() => handleDeleteStock(stocks.stock)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <h2>Add new stock</h2>
      <Form onSubmit={handleNewStockSubmit}>
        <Form.Group className="mb-3" controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="text" onChange={handleNewStockChange} placeholder="Enter Stock" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" onChange={handleNewStockQuantity} placeholder="Quantity" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>

      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </main>
  )
}

export default Dashboard