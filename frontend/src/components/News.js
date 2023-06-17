import Navbar from './Navbar'
import Article from './Article'
import LoadingCaption from './LoadingCaption'
import styles from './News.module.css'

const News = ({ user, handleLogout, news }) => {  
  return (
    <div>
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      {news
        ? <div>
            {news.map((article, i) =>
              <Article
                key={i}
                article={article}
              />
            )}
          </div>
        : <div className={styles.container}>
            <LoadingCaption />
          </div>
      }
    </div>
  )
}

export default News