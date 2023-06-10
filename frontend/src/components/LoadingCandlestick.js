import styles from './LoadingCandlestick.module.css'

const LoadingCandlestick = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <div className={styles.text}>Loading...</div>
    </div>
  )
}

export default LoadingCandlestick