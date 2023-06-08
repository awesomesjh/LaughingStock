import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h1>Oops!</h1>
      <p>404 - Page Not Found</p>
      <p>This page does not exist.</p>
      <Link to='/'>Go back to the home page</Link>
    </div>
  )
}

export default NotFound