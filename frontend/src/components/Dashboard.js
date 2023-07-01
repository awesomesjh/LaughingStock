import StockTable from './StockTable'
import StockForm from './StockForm'
import Navbar from './Navbar'
import Notification from './Notification'
import sortStocks from '../util/sortStocks'
import background from './background.module.css'
import styles from './Dashboard.module.css'

const Dashboard = ({
  user,
  handleLogout,
  stocks,
  sortBy,
  trades,
  newSymbol,
  newQuantity,
  handleNewSymbolChange,
  handleNewQuantityChange,
  handleQuantityChange,
  addStock,
  deleteStock,
  updateQuantity,
  sortStocksAndUpdate,
  message
}) => {

  const checkLoading = () => {
    for (const stock of stocks) {
      if (!trades[stock.symbol]) {
        return true
      }
    }
    return false
  }

  const loading = checkLoading()

  return (
    <main className={background.wallpaper}>
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      <div className={styles.wrapper}>
        <StockTable
          stocks={sortStocks([...stocks], sortBy, trades)}
          sortBy={sortBy}
          trades={trades}
          deleteStock={deleteStock}
          handleQuantityChange={handleQuantityChange}
          updateQuantity={updateQuantity}
          sortStocksAndUpdate={sortStocksAndUpdate}
          loading={loading}
        />
        <p className={background.text}>
          {loading
            ? `Loading price data...`
            : `Total portfolio value = $${stocks.reduce((total, stock) => (total + stock.quantity * trades[stock.symbol].Price), 0).toFixed(2)}`}
        </p>
        <h2 className={background.text}>Add new stock</h2>
        <StockForm
          addStock={addStock}
          newSymbol={newSymbol}
          handleNewSymbolChange={handleNewSymbolChange}
          newQuantity={newQuantity}
          handleNewQuantityChange={handleNewQuantityChange}
          loading={loading}
        />
        <Notification message={message} />
      </div>
    </main>
  )
}

export default Dashboard