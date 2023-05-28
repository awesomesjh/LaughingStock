import { BsFillTrashFill } from 'react-icons/bs'
import './Stock.css'

const Stock = ({ stock, deleteStock, handleQuantityChange, updateQuantity }) => {
  const price = 120
  return (
    <tr>
      <td className='align-middle'>{stock.symbol}</td>
      <td className='quantity'>
        <input
          className = 'input'
          name='quantity'
          value={stock.quantity}
          type='number'
          onChange={(event) => handleQuantityChange(event, stock.id)}
          placeholder='Enter Quantity'
        />
        <button className='save' type='button' onClick={() => updateQuantity(stock.id)}>Save</button>
      </td>
      <td className='align-middle'>${price.toLocaleString("en-US")}</td>
      <td className='align-middle'>${(stock.quantity * price).toLocaleString("en-US")}</td>
      <td className='align-middle'>
        <span className='actions'>
          <BsFillTrashFill color='red' onClick={() => deleteStock(stock.id)} />
        </span>
      </td>
    </tr>
  )
}

export default Stock