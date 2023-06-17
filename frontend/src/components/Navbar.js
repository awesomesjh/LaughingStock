import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import styles from './Navbar.module.css'

const Navibar = ({ user, handleLogout }) => {
  if (!user) {
    return null
  }
  return (
    <>
      {['sm'].map((expand) => (
        // [false, 'sm', 'md', 'lg', 'xl', 'xxl'] are the different sizes before the it becomes off canvas
        <Navbar key={expand} bg='light' expand={expand} className='mb-3' sticky='top'>
          <Container fluid>
            <Navbar.Brand>Welcome to Laughing Stock, {user.username}!</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Laughing Stock
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <Nav.Link as={Link} to='/'>Dashboard</Nav.Link>
                  <Nav.Link as={Link} to='/piechart'>Pie Chart</Nav.Link>
                  <Nav.Link as={Link} to='/candlestick'>Candlestick</Nav.Link>
                  <Nav.Link as={Link} to='/news'>News</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Button className={styles.logout} variant='danger' onClick={handleLogout}>
              Logout
            </Button>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default Navibar