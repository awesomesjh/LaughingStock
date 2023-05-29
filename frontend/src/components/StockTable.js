import Table from 'react-bootstrap/Table'
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcNumericalSorting12,
  FcNumericalSorting21
} from 'react-icons/fc'
import Stock from './Stock'
import styles from './StockTable.module.css'

const StockTable = ({
  stocks,
  deleteStock,
  handleQuantityChange,
  updateQuantity,
  sortSymbolDescending,
  sortSymbolAscending,
  sortQuantityDescending,
  sortQuantityAscending
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr className={styles.tr}>
          <th>
            Symbol
            <span className={styles.sort}>
              <FcAlphabeticalSortingZa onClick={sortSymbolDescending} />
              <FcAlphabeticalSortingAz onClick={sortSymbolAscending} />
            </span>
          </th>
          <th>
            Quantity
            <span className={styles.sort}>
              <FcNumericalSorting21 onClick={sortQuantityDescending} />
              <FcNumericalSorting12 onClick={sortQuantityAscending} />
            </span>
          </th>
          <th>
            Price
            <span className={styles.sort}>
              <FcNumericalSorting21 />
              <FcNumericalSorting12 />
            </span>
          </th>
          <th>
            Total
            <span className={styles.sort}>
              <FcNumericalSorting21 />
              <FcNumericalSorting12 />
            </span>
          </th>
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