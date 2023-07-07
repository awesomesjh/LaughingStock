import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import styles from './Welcome.module.css'

const Welcome = () => {
  return (
    <>
      <div className={`${styles.container} background`}>
        <h1 className={styles.welcomeText}>Welcome to Laughing Stock</h1>
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
      </div>

      <section className={styles.featureSection}>
        <h1 className={styles.featureTitle}>Features</h1>
        
        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/login.png')} alt='login'></img>
            <div className={styles.smallIntro}>
              <h2 className={styles.featureDescription}>Login Functionality</h2>
              <p className={styles.featureExplanation}>Users can create an account and login.</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={require('../img/telegram.png')} alt='telegram bot'></img>
            <div className={styles.smallIntro}>
              <h2 className={styles.featureDescription}>Telegram Bot</h2>
              <p className={styles.featureExplanation}>Provides a convenient way for the user to view their stock portfolio on mobile devices.</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/dashboard.png')} alt='dashboard'></img>
            <div className={styles.largeIntro}>
              <h2 className={styles.featureDescription}>Dashboard</h2>
              <p className={styles.featureExplanation}>Basic CRUD functionality for users to modify their stock portfolio.</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/linechart.png')} alt='linechart'></img>
            <div className={styles.largeIntro}>
              <h2 className={styles.featureDescription}>Line Chart</h2>
              <p className={styles.featureExplanation}>View change in portfolio value over time. React ECharts was used to implement the line chart.</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/candlestick.png')} alt='candlestick'></img>
            <div className={styles.largeIntro}>
              <h2 className={styles.featureDescription}>Candlestick Chart</h2>
              <p className={styles.featureExplanation}>View change in price of a selected stock. Bar data is obtained from Alpaca Market data API, and plotted into a candlestick chart using React ECharts.</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/piechart.png')} alt='piechart'></img>
            <div className={styles.smallIntro}>
              <h2 className={styles.featureDescription}>Pie Chart</h2>
              <p className={styles.featureExplanation}>View composition of portfolio. Chart.js was used to implement the pie chart.</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={require('../img/news.png')} alt='news'></img>
            <div className={styles.smallIntro}>
              <h2 className={styles.featureDescription}>Latest News</h2>
              <p className={styles.featureExplanation}>A list of links to relevant news articles. News articles are scraped from Google News using Playwright.</p>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Welcome