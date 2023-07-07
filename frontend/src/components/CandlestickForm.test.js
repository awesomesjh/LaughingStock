import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CandlestickForm from './CandlestickForm'

const handleSymbolChange = jest.fn()
const handleStartChange = jest.fn()

test('renders the form inputs correctly', () => {
  render(<CandlestickForm />)

  const symbolInput = screen.getByLabelText('Symbol')
  const startSelect = screen.getByLabelText('Get data from:')

  expect(symbolInput).toBeInTheDocument()
  expect(startSelect).toBeInTheDocument()
})

test('calls handleNewCandlestickSymbolChange when symbol input changes', async () => {
  render(
    <CandlestickForm
      handleNewCandlestickSymbolChange={handleSymbolChange}
      loading={false}
    />
  )

  const symbolInput = screen.getByLabelText('Symbol')
  await userEvent.type(symbolInput, 'AAPL')

  expect(handleSymbolChange).toHaveBeenCalledTimes(4)
  expect(handleSymbolChange).toHaveBeenCalledWith(expect.any(Object))
})

test('calls handleNewCandlestickStartChange when start select changes', async () => {
  render(
    <CandlestickForm
      handleNewCandlestickStartChange={handleStartChange}
      loading={false}
    />
  )

  const startSelect = screen.getByLabelText('Get data from:')
  await userEvent.selectOptions(startSelect, screen.getByText('3 Years Ago'))

  expect(handleStartChange).toHaveBeenCalledTimes(1)
  expect(handleStartChange).toHaveBeenCalledWith(expect.any(Object))
  expect(handleStartChange.mock.calls[0][0].target.value).toBe('3')
})

test('calls fetchCandlestickData when form is submitted', async () => {
  const fetchCandlestickData = jest.fn(e => e.preventDefault())
  render(
    <CandlestickForm
      fetchCandlestickData={fetchCandlestickData}
      loading={false}
    />
  )

  const submitButton = screen.getByRole('button', { name: 'Get Data' })
  await userEvent.click(submitButton)

  expect(fetchCandlestickData).toHaveBeenCalledTimes(1)
})

test('disables the form inputs and button when loading is true', () => {
  render(<CandlestickForm loading={true} />)

  const symbolInput = screen.getByLabelText('Symbol')
  const startSelect = screen.getByLabelText('Get data from:')
  const submitButton = screen.getByRole('button', { name: 'Get Data' })

  expect(symbolInput).toHaveAttribute('readOnly')
  expect(startSelect).toBeDisabled()
  expect(submitButton).toBeDisabled()
})