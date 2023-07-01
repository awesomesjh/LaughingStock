import styles from "./Notification.module.css"
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={styles.error}>
      {message}
    </div>
  )
}

export default Notification