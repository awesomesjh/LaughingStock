import { BsFillTrashFill } from 'react-icons/bs'
import blockKeys from '../util/blockKeys'
import blockPaste from '../util/blockPaste'
import Loading from './Loading'
import styles from './Stock.module.css'

const Stock = ({
  stock,
  price,
  deleteStock,
  handleQuantityChange,
  updateQuantity,
  loading
}) => {
  return (
    <tr>
      <td className='align-middle'>{stock.symbol}</td>
      <td className={styles.quantity}>
        <input
          className = {styles.input}
          name='quantity'
          value={stock.quantity}
          type='number'
          min='0'
          onKeyDown={(event) => blockKeys(event)}
          onChange={(event) => handleQuantityChange(event, stock.id)}
          onPaste={(event) => blockPaste(event)}
          placeholder='Enter Quantity'
          readOnly={loading}
        />
        <button
          className={styles.save}
          type='button'
          onClick={() => updateQuantity(stock.id)}
          disabled={loading}
        >
          Save
        </button>
      </td>
      <td className='align-middle'>{price ? `$${price.toFixed(2)}` : <Loading />}</td>
      <td className='align-middle'>{price ? `$${(price * stock.quantity).toFixed(2)}` : <Loading />}</td>
      <td className='align-middle'>
        <span className={styles.delete}>
          <BsFillTrashFill data-testid='delete' color='red' onClick={loading ? null : () => deleteStock(stock.id)} />
        </span>
      </td>
    </tr>
  )
}

export default Stock