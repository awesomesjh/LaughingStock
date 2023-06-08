import Welcome from './Welcome'
import Dashboard from './Dashboard'

const Main = ({ 
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
  if (user) {
    return (
      <Dashboard
        user={user}
        handleLogout={handleLogout}
        stocks={stocks}
        sortBy={sortBy}
        trades={trades}
        newSymbol={newSymbol}
        newQuantity={newQuantity}
        handleNewSymbolChange={handleNewSymbolChange}
        handleNewQuantityChange={handleNewQuantityChange}
        handleQuantityChange={handleQuantityChange}
        addStock={addStock}
        deleteStock={deleteStock}
        updateQuantity={updateQuantity}
        sortStocksAndUpdate={sortStocksAndUpdate}
        message={message}
      />
    )
  }
  return (
    <Welcome />
  )
}

export default Main