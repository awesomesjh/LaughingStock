const PastStock = ({ pastStock }) => {
  return (
    <tr>
      <td>{pastStock.symbol}</td>
      <td>{pastStock.quantity}</td>
      <td>${pastStock.price.toFixed(2)}</td>
      <td>${pastStock.total.toFixed(2)}</td>
    </tr>
  )
}

export default PastStock