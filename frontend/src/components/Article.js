import { useState, useRef } from 'react'
import styles from './Article.module.css'

const Article = ({ article }) => {
  const [hover, setHover] = useState(false)
  
  const logoSourceRef = useRef()
  const sourceRef = useRef()

  const handleImageError = (event) => {
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

  const handleLogoError = (event) => {
    event.target.style.display = 'none'
    sourceRef.current.style.display = 'block'
  }

  const handleLogoLoad = (event) => {
    if (article.logo.slice(0, 17) === 'https://encrypted') {
      sourceRef.current.style.display = 'block'
    } else {
      logoSourceRef.current.style.display = 'contents'
      event.target.style.all = 'unset'
    }
  }

  return (
    <div
      data-testid='article-container'
      className={styles.articleContainer}
      onClick={handleClick}
      onMouseEnter={(event) => handleMouseEnter(event)}
      onMouseLeave={(event) => handleMouseLeave(event)}
    >
      <div className={styles.logoTitleDateContainer}>
        <div className={styles.logoContainer}>
          <div data-testid='logo-source-container' className={styles.logoSourceContainer} ref={logoSourceRef}>
            <img
              className={styles.logo}
              src={article.logo}
              alt='logo'
              onError={(event) => handleLogoError(event)}
              onLoad={(event) => handleLogoLoad(event)}
            />
            <span className={styles.source} ref={sourceRef}>{article.source}</span>
          </div>
        </div>
        <div className={styles.titleDateContainer}>
          <h2 className={`${styles.title} ${hover ? styles.hover : ''}`}>{article.title}</h2>
          <p className={styles.date}>{article.date}</p>
        </div>
      </div>
      <div className={styles.imgParentContainer}>
        <div className={styles.imgChildContainer}>
          {article.img
            ? <img 
                className={styles.img}
                src={article.img}
                alt=''
                onError={(event) => handleImageError(event)}
              />
            : null
          }
          {article.img && article.img.slice(0, 23) === 'https://img.youtube.com'
            ? <div data-testid='play-button-overlay' className={styles.playButtonOverlay}></div>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Article