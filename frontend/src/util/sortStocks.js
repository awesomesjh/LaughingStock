const sortStocks = (stocks, sortBy, trades) => {
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
      stocks.sort((a, b) => {
        if (!trades[a.symbol] && !trades[b.symbol]) {
          return compareBySymbol(a, b)
        } else if (!trades[a.symbol] && trades[b.symbol]) {
          return 1
        } else if (trades[a.symbol] && !trades[b.symbol]) {
          return -1
        } else {
          return trades[a.symbol].Price - trades[b.symbol].Price
        }
      })
      break
    case 'price descending':
      stocks.sort((a, b) => {
        if (!trades[a.symbol] && !trades[b.symbol]) {
          return compareBySymbol(a, b)
        } else if (!trades[a.symbol] && trades[b.symbol]) {
          return 1
        } else if (trades[a.symbol] && !trades[b.symbol]) {
          return -1
        } else {
          return trades[b.symbol].Price - trades[a.symbol].Price
        }
      })
      break
    case 'total ascending':
      stocks.sort((a, b) => {
        if (!trades[a.symbol] && !trades[b.symbol]) {
          return compareBySymbol(a, b)
        } else if (!trades[a.symbol] && trades[b.symbol]) {
          return 1
        } else if (trades[a.symbol] && !trades[b.symbol]) {
          return -1
        } else {
          return trades[a.symbol].Price * a.quantity - trades[b.symbol].Price * b.quantity
        }
      })
      break
    case 'total descending':
      stocks.sort((a, b) => {
        if (!trades[a.symbol] && !trades[b.symbol]) {
          return compareBySymbol(a, b)
        } else if (!trades[a.symbol] && trades[b.symbol]) {
          return 1
        } else if (trades[a.symbol] && !trades[b.symbol]) {
          return -1
        } else {
          return trades[b.symbol].Price * b.quantity - trades[a.symbol].Price * a.quantity
        }
      })
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

export default sortStocks