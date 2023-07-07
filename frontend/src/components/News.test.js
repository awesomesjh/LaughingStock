import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import News from './News'

test('renders articles when news data is available', () => {
  const news = [
    { title: 'Article 1' },
    { title: 'Article 2' }
  ]
  render(
    <News
      news={news}
      newsUpdated={true}
      checkingValidSymbol={false}
      fetchingNews={false}
    />
  )

  const articles = screen.getAllByRole('article')
  expect(articles).toHaveLength(news.length)

  const loadingCaption = screen.queryByText('Loading...')
  expect(loadingCaption).not.toBeInTheDocument()
})

test('renders loading caption when news data is not available', () => {
  render(<News news={null} />)

  const loadingCaption = screen.getByText('Loading...')
  expect(loadingCaption).toBeInTheDocument()

  const articles = screen.queryAllByRole('article')
  expect(articles).toHaveLength(0)
})