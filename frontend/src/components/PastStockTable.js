import Table from 'react-bootstrap/Table'
import PastStock from './PastStock'
import styles from './PastStockTable.module.css'

const PastStockTable = ({ pastStocks, captionTimestamp }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <caption className={styles.caption}>
            {`Portfolio on ${captionTimestamp}`}
          </caption>
          <thead>
            <tr>
              <th className={styles.th}>Symbol</th>
              <th className={styles.th}>Quantity</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Total</th>
            </tr>
          </thead>
          <tbody>
            {pastStocks.map((pastStock, i) =>
              <PastStock
                key={i}
                pastStock={pastStock}
              />
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default PastStockTable