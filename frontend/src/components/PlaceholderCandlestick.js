import LoadingCandlestick from './LoadingCandlestick'
import styles from './PlaceholderCandlestick.module.css'

const PlaceholderCandlestick = ({ loading, error }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {loading
          ? <LoadingCandlestick />
          : error
          ? 'Stock not found. Please enter a valid symbol.'
          : 'Enter a symbol to begin using candlestick chart.'
        }
      </div>
    </div>
  )
}

export default PlaceholderCandlestick