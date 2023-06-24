import styles from './Arrow.module.css'

const Arrow = ({ color, RED }) => (
  <svg 
    className={`${styles.svg} ${color === RED ? styles.red : styles.green}`}
    viewBox='0 0 12 12'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M6,0.002L0 6.002 4.8 6.002 4.8 11.9996 7.2 11.9996 7.2 6.002 12 6.002z'></path>
  </svg>
)

export default Arrow