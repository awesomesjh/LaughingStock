const sortStocks = (stocks, sortBy) => {
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
    
    // The following code can't be added yet as the price is still constant and not referencing the backend yet
    // Take note the code has not been tested yet
    //
    // case 'price ascending':
    //   stocks.sort((a, b) => (a.price > b.price) ? 1 : (a.price < b.price) ? -1 : 0)
    //   break
    // case 'price decending':
    //   stocks.sort((a, b) => (b.price > a.price) ? 1 : (b.price < a.price) ? -1 : 0)
    //   break
    // case 'total ascending':
    //   stocks.sort((a, b) => (a.price*a.quantity > b.price*b.quantity) ? 1 : (a.price*a.quanitity < b.price*b.quantity) ? -1 : 0)
    //   break
    // case 'total decending':
    //   stocks.sort((a, b) => (b.price*b.quantity > a.price*a.quantity) ? 1 : (b.price*b.quanitity < a.price*a.quantity) ? -1 : 0)
    //   break
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