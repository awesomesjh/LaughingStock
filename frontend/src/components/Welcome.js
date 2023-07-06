import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import styles from './Welcome.module.css'

const Welcome = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={require('../img/background.jpg')} alt='stock background' className={styles.background}></img>
        {/* use styles.foreground for foreground image */}
        <div className={styles.container}>
          <h2 className={styles.welcomeText}>Welcome to Laughing Stock</h2>
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
        </div>
      </div>

      <section className={styles.featureSection}>
        <h1 className={styles.featureTitle}>Features</h1>
        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/login.png')} alt='login' className={styles.smallImg}></img>
            <div className={styles.smallIntro}>
              <h1 className={styles.featureDescription}>Login Functionality</h1>
              <p className={styles.featureExplanation}>Users can create an account and log in.</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={require('../img/telegram.png')} alt='telegram bot' className={styles.smallImg}></img>
            <div className={styles.smallIntro}>
              <h1 className={styles.featureDescription}>Telegram Bot</h1>
              <p className={styles.featureExplanation}>Provides a convenient way for the user to view their stock portfolio on mobile devices</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/dashboard.png')} alt='dashboard' className={styles.largeImg}></img>
            <div className={styles.largeIntro}>
              <h1 className={styles.featureDescription}>Dashboard</h1>
              <p className={styles.featureExplanation}>Basic CRUD functionality for users to modify their stock portfolio.</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/linechart.png')} alt='linechart' className={styles.largeImg}></img>
            <div className={styles.largeIntro}>
              <h1 className={styles.featureDescription}>Line Chart</h1>
              <p className={styles.featureExplanation}>View change in portfolio value over time.</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/candlestick.png')} alt='candlestick' className={styles.largeImg}></img>
            <div className={styles.largeIntro}>
              <h1 className={styles.featureDescription}>Candlestick Chart</h1>
              <p className={styles.featureExplanation}>View change in price of a selected stock. Bar data is obtained from Alpaca Market data API, and plotted into a candlestick chart using React ECharts.</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSet}>
          <div className={styles.card}>
            <img src={require('../img/piechart.png')} alt='piechart' className={styles.smallImg}></img>
            <div className={styles.smallIntro}>
              <h1 className={styles.featureDescription}>Piechart</h1>
              <p className={styles.featureExplanation}>View composition of portfolio.</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={require('../img/news.png')} alt='news' className={styles.smallImg}></img>
            <div className={styles.smallIntro}>
              <h1 className={styles.featureDescription}>Latest News</h1>
              <p className={styles.featureExplanation}>A list of links to relevant news articles. News articles are scraped from Google News using Playwright.</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Welcome