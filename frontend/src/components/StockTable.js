import Table from 'react-bootstrap/Table'
import Stock from './Stock'
import styles from './StockTable.module.css'
import { FcNumericalSorting12, FcNumericalSorting21 } from 'react-icons/fc'

const StockTable = ({ stocks, deleteStock, handleQuantityChange, updateQuantity, sortQuantityDescending, sortQuantityAscending }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr className={styles.tr}>
          <th>Symbol</th>
          <th>
            Quantity
            <span className={styles.sort}>
              <FcNumericalSorting21 onClick={() => sortQuantityDescending()} />
              <FcNumericalSorting12 onClick={() => sortQuantityAscending()} />
            </span>
          </th>
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
  )
}

export default StockTable