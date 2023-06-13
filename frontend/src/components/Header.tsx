import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Link to='/'>
            <Navbar.Brand>TaskManager</Navbar.Brand>
          </Link>
          <Nav className="mr-auto justify-content-end">
            <Nav.Item>
              <Link to='/login'>Login</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to='/logout'>Logout</Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
