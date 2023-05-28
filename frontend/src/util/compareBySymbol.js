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

export default compareBySymbol