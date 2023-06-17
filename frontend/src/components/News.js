import { useEffect, memo } from 'react'
import Navbar from './Navbar'
import Article from './Article'
import LoadingCaption from './LoadingCaption'
import styles from './News.module.css'

const News = ({
  user,
  handleLogout,
  news,
  newsUpdated,
  currentSymbols,
  fetchNews,
  checkingValidSymbol,
  fetchingNews
}) => {
  useEffect(() => {
    if (news && !newsUpdated && !checkingValidSymbol && !fetchingNews) {
      fetchNews([...currentSymbols])
    }
  }, [news, newsUpdated, currentSymbols, fetchNews, checkingValidSymbol, fetchingNews])

  return (
    <div>
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      {news && newsUpdated && !checkingValidSymbol && !fetchingNews
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

// memo ensures that the component rerenders only when props have changed
export default memo(News)