import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import styles from './Welcome.module.css'

const Welcome = () => {
  return (
    <main className={`${styles.container} background`}>
      <h2 className={styles.header}>Welcome to Laughing Stock</h2>
      <Link to='/login'>
        <Button>Login</Button>
      </Link>
    </main>
  )
}

export default Welcome