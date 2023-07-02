import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const NotFound = () => {
  return (
    <Container>
      <h1>Oops!</h1>
      <p>404 - Page Not Found</p>
      <p>This page does not exist.</p>
      <Link to='/'>
        <Button>Go back to the home page</Button>
      </Link>
    </Container>
  )
}

export default NotFound