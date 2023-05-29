const sortStocks = (stocks, sortBy) => {
  switch(sortBy) {
    default: //symbol ascending
      stocks.sort(compareBySymbol)
      break
    case 'symbol descending':
      stocks.sort(compareBySymbol).reverse()
      break
    case 'quantity ascending':
      stocks.sort((a, b) => a.quantity - b.quantity)
      break
    case 'quantity descending':
      stocks.sort((a, b) => b.quantity - a.quantity)
  }
  return stocks
}

const compareBySymbol = (a, b) => {
  const symbolA = a.symbol.toUpperCase()
  const symbolB = b.symbol.toUpperCase()

  if (symbolA < symbolB) {
    return -1
  }
  if (symbolA > symbolB) {
    return 1
  }
  return 0
}

export default sortStocks