import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import blockNonAlphabetKeys from '../util/blockNonAlphabetKeys'
import blockNonAlphabetPaste from '../util/blockNonAlphabetPaste'
import styles from './CandlestickForm.module.css'

const CandlestickForm = ({
  newCandlestickSymbol,
  newCandlestickStart,
  handleNewCandlestickSymbolChange,
  handleNewCandlestickStartChange,
  fetchCandlestickData,
  loading
}) => {
  return (
    <Form onSubmit={fetchCandlestickData}>
      <Form.Group className='mb-3' controlId='formSymbol'>
        <Form.Label className={styles.label}>Symbol</Form.Label>
        <Form.Control 
          type='text'
          value={newCandlestickSymbol}
          onKeyDown={(event) => blockNonAlphabetKeys(event)}
          onChange={handleNewCandlestickSymbolChange}
          onPaste={(event) => blockNonAlphabetPaste(event)}
          placeholder='Enter Symbol'
          readOnly={loading}
          required
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formStart'>
        <Form.Label className={styles.label}>Get data from:</Form.Label>
        <Form.Select
          value={newCandlestickStart}
          onChange={handleNewCandlestickStartChange}
          disabled={loading}
        >   
          <option value='1'>1 Year Ago</option>
          <option value='3'>3 Years Ago</option>
          <option value='5'>5 Years Ago</option>
          <option value='10'>10 Years Ago</option>
        </Form.Select>
      </Form.Group>
      <Button variant='primary' type='submit' disabled={loading}>
        Get Data
      </Button>
    </Form>
  )
}

export default CandlestickForm