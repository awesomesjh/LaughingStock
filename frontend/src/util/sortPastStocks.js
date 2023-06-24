const sortPastStocks = (stocks, sortBy) => {
  switch (sortBy) {
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
      break
    case 'price ascending':
      stocks.sort((a, b) => a.price - b.price)
      break
    case 'price descending':
      stocks.sort((a, b) => b.price - a.price)
      break
    case 'total ascending':
      stocks.sort((a, b) => a.total - b.total)
      break
    case 'total descending':
      stocks.sort((a, b) => b.total - a.total)
  }
  return stocks
}

const compareBySymbol = (a, b) => {
  if (a.symbol < b.symbol) {
    return -1
  }
  if (a.symbol > b.symbol) {
    return 1
  }
  return 0
}

export default sortPastStocks