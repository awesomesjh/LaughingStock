import { BsFillTrashFill } from "react-icons/bs"
import "./Stock.css"

const Stock = ({ stock, deleteStock, onChangeInput }) => {
  const price = 120
  return (
    <tr>
      <td>{stock.symbol}</td>
      <td>
        <input
          name="quantity"
          value={stock.quantity}
          type="number"
          onChange={(e) => onChangeInput(e, stock.symbol)}
          placeholder="Type Quantity"
        />
      </td>
      <td>{price}</td>
      <td>{stock.quantity * price}</td>
      <td>
        <span className="actions">
          <BsFillTrashFill color='red' onClick={() => deleteStock(stock.id)} />
        </span>
        {/* <button type='button' onClick={() => deleteStock(stock.id)}>Delete</button> */}
      </td>
    </tr>
  )
}

export default Stock