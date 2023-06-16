import { useState } from 'react'
import styles from './Article.module.css'

const Article = ({ article }) => {
  const [hover, setHover] = useState(false)

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

  return (
    <div 
      className={styles.articleContainer}
      onClick={handleClick}
      onMouseEnter={(event) => handleMouseEnter(event)}
      onMouseLeave={(event) => handleMouseLeave(event)}
    >
      <div className={styles.logoTitleDateContainer}>
        <div className={styles.logoContainer}>
          {article.logo.slice(0, 17) === 'https://encrypted'
            ? <div className={styles.logoSourceContainer}>
                <img className={styles.logo} src={article.logo} alt='logo'/>
                <span className={styles.source}>{article.source}</span>
              </div>
            : <img src={article.logo} alt='logo'/>
          }
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
            ? <div className={styles.playButtonOverlay}></div>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Article