import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StockForm from './StockForm'


test('renders the form fields and submit button', () => {
  const newSymbol = 'AAPL'
  const handleNewSymbolChange = jest.fn()
  const newQuantity = '3'
  const handleNewQuantityChange = jest.fn()
  const loading = false

  render(
    <StockForm
      newSymbol={newSymbol}
      handleNewSymbolChange={handleNewSymbolChange}
      newQuantity={newQuantity}
      handleNewQuantityChange={handleNewQuantityChange}
      loading={loading}
    />
  )

  const symbolInput = screen.getByLabelText('Symbol')
  expect(symbolInput).toBeInTheDocument()
  expect(symbolInput.value).toBe(newSymbol)

  const quantityInput = screen.getByLabelText('Quantity')
  expect(quantityInput).toBeInTheDocument()
  expect(quantityInput.value).toBe(newQuantity)

  const addButton = screen.getByText('Add')
  expect(addButton).toBeInTheDocument()
  expect(addButton).not.toBeDisabled()
})

test('calls addStock function on form submission', async () => {
  const addStock = jest.fn(e => e.preventDefault())
  const loading = false

  render(<StockForm addStock={addStock} loading={loading}/>)

  const addButton = screen.getByText('Add')
  await userEvent.click(addButton)
  expect(addStock).toHaveBeenCalledTimes(1)
})

test('updates symbol and quantity values on input change', async () => {
  const newSymbol = ''
  const handleNewSymbolChange = jest.fn()
  const newQuantity = ''
  const handleNewQuantityChange = jest.fn()

  render(
    <StockForm
      newSymbol={newSymbol}
      handleNewSymbolChange={handleNewSymbolChange}
      newQuantity={newQuantity}
      handleNewQuantityChange={handleNewQuantityChange}
    />
  )

  const symbolInput = screen.getByLabelText('Symbol')
  await userEvent.type(symbolInput, 'AAPL')
  expect(handleNewSymbolChange).toHaveBeenCalledTimes(4)
  expect(handleNewSymbolChange).toHaveBeenCalledWith(expect.any(Object))

  const quantityInput = screen.getByLabelText('Quantity')
  await userEvent.type(quantityInput, '3')
  expect(handleNewQuantityChange).toHaveBeenCalledTimes(1)
  expect(handleNewQuantityChange).toHaveBeenCalledWith(expect.any(Object))
})
