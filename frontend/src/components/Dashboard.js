import StockTable from './StockTable'
import StockForm from './StockForm'
import Navbar from './Navbar'
import Notification from './Notification'
import sortStocks from '../util/sortStocks'

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
    <main>
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      <StockTable
        stocks={sortStocks([ ...stocks ], sortBy, trades)}
        sortBy={sortBy}
        trades={trades}
        deleteStock={deleteStock}
        handleQuantityChange={handleQuantityChange}
        updateQuantity={updateQuantity}
        sortStocksAndUpdate={sortStocksAndUpdate}
        loading={loading}
      />
      <p>
        {loading
          ? `Loading price data...`
          : `Total portfolio value = $${stocks.reduce((total, stock) => (total + stock.quantity * trades[stock.symbol].Price), 0).toFixed(2)}`}
      </p>
      <h2>Add new stock</h2>
      <StockForm
        addStock={addStock}
        newSymbol={newSymbol}
        handleNewSymbolChange={handleNewSymbolChange}
        newQuantity={newQuantity}
        handleNewQuantityChange={handleNewQuantityChange}
        loading={loading}
      />
      <Notification message={message} />
    </main>
  )
}

export default Dashboard