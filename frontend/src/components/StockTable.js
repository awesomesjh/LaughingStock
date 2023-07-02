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
  trades,
  deleteStock,
  handleQuantityChange,
  updateQuantity,
  sortStocksAndUpdate,
  loading
}) => {
  return (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr className={styles.tr}>
          <th>
            Symbol
            <span className={styles.sort}>
              <FcAlphabeticalSortingZa
                data-testid='symbol-descending'
                className={sortBy === 'symbol descending' ? styles.selected : ''}
                onClick={() => sortStocksAndUpdate('symbol descending')}
              />
              <FcAlphabeticalSortingAz
                data-testid='symbol-ascending'
                className={sortBy === 'symbol ascending' ? styles.selected : ''}
                onClick={() => sortStocksAndUpdate('symbol ascending')}
              />
            </span>
          </th>
          <th>
            Quantity
            <span className={styles.sort}>
              <FcNumericalSorting21
                className={sortBy === 'quantity descending' ? styles.selected : ''}
                onClick={() => sortStocksAndUpdate('quantity descending')}
              />
              <FcNumericalSorting12
                className={sortBy === 'quantity ascending' ? styles.selected : ''}
                onClick={() => sortStocksAndUpdate('quantity ascending')}
              />
            </span>
          </th>
          <th>
            Price
            <span className={styles.sort}>
              <FcNumericalSorting21
                className={sortBy === 'price descending' ? styles.selected : ''}
                onClick={loading ? null : () => sortStocksAndUpdate('price descending')}
              />
              <FcNumericalSorting12
                className={sortBy === 'price ascending' ? styles.selected : ''}
                onClick={loading ? null : () => sortStocksAndUpdate('price ascending')}
              />
            </span>
          </th>
          <th>
            Total
            <span className={styles.sort}>
              <FcNumericalSorting21
                className={sortBy === 'total descending' ? styles.selected : ''}
                onClick={loading ? null : () => sortStocksAndUpdate('total descending')}
              />
              <FcNumericalSorting12
                className={sortBy === 'total ascending' ? styles.selected : ''}
                onClick={loading ? null : () => sortStocksAndUpdate('total ascending')}
              />
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
            price={trades[stock.symbol] ? trades[stock.symbol].Price : null}
            deleteStock={deleteStock}
            handleQuantityChange={handleQuantityChange}
            updateQuantity={updateQuantity}
            loading={loading}
          />
        )}
      </tbody>
    </Table>
  )
}

export default StockTable