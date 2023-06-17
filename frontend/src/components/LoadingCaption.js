import styles from './LoadingCaption.module.css'

const LoadingCaption = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <div className={styles.text}>Loading...</div>
    </div>
  )
}

export default LoadingCaption