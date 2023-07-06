import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import PlaceholderCandlestick from './PlaceholderCandlestick'

test('renders loading caption when loading is true', () => {
  render(<PlaceholderCandlestick loading={true} />)
  
  const loadingCaption = screen.getByText('Loading...')
  expect(loadingCaption).toBeInTheDocument()
})

test('renders error message when error is true', () => {
  render(<PlaceholderCandlestick loading={false} error={true} />)
  
  const errorMessage = screen.getByText('Stock not found. Please enter a valid symbol.')
  expect(errorMessage).toBeInTheDocument()
})

test('renders default message when loading and error are false', () => {
  render(<PlaceholderCandlestick loading={false} error={false} />)
  
  const defaultMessage = screen.getByText('Enter a symbol to begin using candlestick chart.')
  expect(defaultMessage).toBeInTheDocument()
})