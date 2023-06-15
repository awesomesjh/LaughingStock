import { useState } from 'react'
import './Article.css'

const Article = ({ article }) => {
  const [hover, setHover] = useState(false)

  const handleImageError = (event) => {
    console.log(event.target)
    event.target.style.display = 'none'
  }

  const handleClick = () => {
    window.open(article.link, '_blank')
  }

  const handleMouseEnter = (event) => {
    setHover(true)
    event.target.style.cursor = 'pointer'
  }

  const handleMouseLeave = (event) => {
    setHover(false)
    event.target.style.cursor = 'default'
  }

  return (
    <div className="news-container" onClick={handleClick} onMouseEnter={(event) => handleMouseEnter(event)} onMouseLeave={(event) => handleMouseLeave(event)}>
      <div className="news-header">
        <div className="news-logo">
          {article.logo.slice(0, 17) === 'https://encrypted'
            ? <div className="logo-container">
                <img src={article.logo} className="logo" alt="logo" />
                <span className="text">{article.source}</span>
              </div>
            : <img src={article.logo} alt='logo'></img>
          }
        </div>
        <div className="news-title-date">
          <h2 className={`news-title ${hover ? 'hover' : ''}`}>{article.title}</h2>
          <p className="news-date">{article.time}</p>
        </div>
      </div>
      <div className="news-content">
        <div className="news-image">
          {article.img ? <img className='img' src={article.img} alt='' onError={(event) => handleImageError(event)}></img> : null}
          {article.img && article.img.slice(0, 23) === 'https://img.youtube.com' ? <div className="play-button-overlay"></div> : null}
        </div>
      </div>
    </div>
  )
}

export default Article