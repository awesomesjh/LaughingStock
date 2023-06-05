import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import blockKeys from '../util/blockKeys'
import blockPaste from '../util/blockPaste'
import blockNonAlphabetKeys from '../util/blockNonAlphabetKeys'
import blockNonAlphabetPaste from '../util/blockNonAlphabetPaste'

const StockForm = ({
  addStock,
  newSymbol,
  handleNewSymbolChange,
  newQuantity,
  handleNewQuantityChange,
  loading
}) => {
  return (
    <Form onSubmit={addStock}>
      <Form.Group className='mb-3' controlId='formStock'>
        <Form.Label>Symbol</Form.Label>
        <Form.Control 
          type='text'
          value={newSymbol}
          onKeyDown={(event) => blockNonAlphabetKeys(event)}
          onChange={handleNewSymbolChange}
          onPaste={(event) => blockNonAlphabetPaste(event)}
          placeholder='Enter Symbol'
          readOnly={loading}
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
          onPaste={(event) => blockPaste(event)}
          placeholder='Enter Quantity'
          readOnly={loading}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={loading}>
        Add
      </Button>
    </Form>
  )
}

export default StockForm