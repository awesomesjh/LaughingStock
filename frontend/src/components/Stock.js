import { BsFillTrashFill } from 'react-icons/bs'
import blockKeys from '../util/blockKeys'
import styles from './Stock.module.css'

const Stock = ({ stock, deleteStock, handleQuantityChange, updateQuantity }) => {
  const price = 120
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
          placeholder='Enter Quantity'
        />
        <button className={styles.save} type='button' onClick={() => updateQuantity(stock.id)}>Save</button>
      </td>
      <td className='align-middle'>${price.toLocaleString("en-US")}</td>
      <td className='align-middle'>${(stock.quantity * price).toLocaleString("en-US")}</td>
      <td className='align-middle'>
        <span className={styles.delete}>
          <BsFillTrashFill color='red' onClick={() => deleteStock(stock.id)} />
        </span>
      </td>
    </tr>
  )
}

export default Stock