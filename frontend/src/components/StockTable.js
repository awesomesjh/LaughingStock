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
  sortBy,
  deleteStock,
  handleQuantityChange,
  updateQuantity,
  sortStocksAndUpdate
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr className={styles.tr}>
          <th>
            Symbol
            <span className={styles.sort}>
              <FcAlphabeticalSortingZa 
                className={sortBy === 'symbol descending' ? styles.selected : ''}
                onClick={() => sortStocksAndUpdate(stocks, 'symbol descending')}
              />
              <FcAlphabeticalSortingAz
                className={sortBy === 'symbol ascending' ? styles.selected : ''}
                onClick={() => sortStocksAndUpdate(stocks, 'symbol ascending')}
              />
            </span>
          </th>
          <th>
            Quantity
            <span className={styles.sort}>
              <FcNumericalSorting21
                className={sortBy === 'quantity descending' ? styles.selected : ''}
                onClick={() => sortStocksAndUpdate(stocks, 'quantity descending')}
              />
              <FcNumericalSorting12
                className={sortBy === 'quantity ascending' ? styles.selected : ''}
                onClick={() => sortStocksAndUpdate(stocks, 'quantity ascending')}
              />
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