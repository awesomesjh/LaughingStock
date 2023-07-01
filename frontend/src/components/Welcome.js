import { Link } from 'react-router-dom'
import styles from './Welcome.module.css'

const Welcome = () => {
  return (
    <main className={styles.background}>
      <h2 className={styles.header}>Welcome to Laughing Stock!</h2>
      <div className={styles.signup}><Link to="/signup">Signup!</Link></div>
      <div className={styles.login}><Link to="/login">Login</Link></div>
    </main>
  )
}

export default Welcome