import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Article from './Article'

const article = {
  title: 'Test Article',
  date: '2023-07-01',
  logo: 'logo-url.png',
  source: 'Test Source',
  img: 'image-url.png',
  link: 'https://example.com/article'
}

window.open = jest.fn()

test('renders article title', () => {
  render(<Article article={article} />)

  const title = screen.getByText(article.title)
  expect(title).toBeInTheDocument()
})

test('renders article date', () => {
  render(<Article article={article} />)
  
  const date = screen.getByText(article.date)
  expect(date).toBeInTheDocument()
})

test('renders article logo', () => {
  render(<Article article={article} />)

  const logo = screen.getByAltText('logo')
  expect(logo).toBeInTheDocument()
})

test('renders article source', () => {
  render(<Article article={article} />)

  const source = screen.getByText(article.source)
  expect(source).toBeInTheDocument()
})

test('renders article image if available', () => {
  render(<Article article={article} />)

  const image = screen.getByAltText('')
  expect(image).toBeInTheDocument()
  expect(image).toHaveAttribute('src', article.img)
})

test('handles click event and opens article link in a new tab', async () => {
  render(<Article article={article} />)

  const articleContainer = screen.getByTestId('article-container')
  await userEvent.click(articleContainer)
  expect(window.open).toHaveBeenCalledWith(article.link, '_blank')
})

test('handles mouse enter event and adds hover class to article title', async () => {
  render(<Article article={article} />)

  const title = screen.getByText(article.title)
  await userEvent.hover(title)
  expect(title).toHaveClass('hover')
})

test('handles mouse leave event and removes hover class from article title', async () => {
  render(<Article article={article} />)

  const title = screen.getByText(article.title)
  await userEvent.hover(title)
  await userEvent.unhover(title)
  expect(title).not.toHaveClass('hover')
})

test('handles image load error and hides the image', () => {
  render(<Article article={article} />)

  const image = screen.getByAltText('')
  fireEvent.error(image)
  expect(image).not.toBeVisible()
})

test('when logo is small, handles logo load correctly', () => {
  const smallLogoArticle = { ...article, logo: 'https://encrypted/logo-url.png' }
  render(<Article article={smallLogoArticle} />)

  const logo = screen.getByAltText('logo')
  const source = screen.getByText(article.source)
  fireEvent.load(logo)
  expect(source).toHaveStyle('display: block')
})

test('when logo is large, handles logo load correctly', () => {
  render(<Article article={article} />)

  const logo = screen.getByAltText('logo')
  const logoSourceContainer = screen.getByTestId('logo-source-container')
  fireEvent.load(logo)
  expect(logoSourceContainer).toHaveStyle('display: contents')
})

test('handles logo error and hides the logo, shows the source', () => {
  render(<Article article={article} />)

  const logo = screen.getByAltText('logo')
  const source = screen.getByText(article.source)
  fireEvent.error(logo)
  expect(logo).not.toBeVisible()
  expect(source).toHaveStyle('display: block')
})

test('renders play button overlay for YouTube image links', () => {
  const youtubeArticle = { ...article, img: 'https://img.youtube.com/test-image' }
  render(<Article article={youtubeArticle} />)

  const playButtonOverlay = screen.getByTestId('play-button-overlay')
  expect(playButtonOverlay).toBeInTheDocument()
})

test('does not render play button overlay for non-YouTube image links', () => {
  render(<Article article={article} />)

  const playButtonOverlay = screen.queryByTestId('play-button-overlay')
  expect(playButtonOverlay).not.toBeInTheDocument()
})