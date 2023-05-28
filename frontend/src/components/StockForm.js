import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import blockKeys from '../util/blockKeys'

const StockForm = ({ addStock, newSymbol, handleNewSymbolChange, newQuantity, handleNewQuantityChange }) => {
  return (
    <Form onSubmit={addStock}>
      <Form.Group className='mb-3' controlId='formStock'>
        <Form.Label>Symbol</Form.Label>
        <Form.Control 
          type='text'
          value={newSymbol}
          onChange={handleNewSymbolChange}
          placeholder='Enter Symbol'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formQuantity'>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type='number'
          min='1'
          value={newQuantity}
          onKeyDown={(event) => blockKeys(event)}
          onChange={handleNewQuantityChange}
          placeholder='Enter Quantity'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Add
      </Button>
    </Form>
  )
}

export default StockForm