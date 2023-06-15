import Navbar from './Navbar'
import Article from './Article'
import LoadingCandlestick from './LoadingCandlestick'

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
        : <div className='centered-container'><LoadingCandlestick /></div>
      }
    </div>
  )
}

export default News