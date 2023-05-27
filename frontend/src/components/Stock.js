const Stock = ({ stock, deleteStock }) => {
  const price = 120
  return (
    <tr>
      <td>{stock.symbol}</td>
      <td>{stock.quantity}</td>
      <td>{price}</td>
      <td>{stock.quantity * price}</td>
      <td>
        <button type='button' onClick={() => deleteStock(stock.id)}>Delete</button>
      </td>
    </tr>
  )
}

export default Stock