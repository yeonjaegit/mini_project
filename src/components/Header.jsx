import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

function Header() {
  return (
    <>
      <Navbar className='nav' bg="light" data-bs-theme="light">
        <Container className='navContainer'>
          <Navbar.Brand href="allSchedule"><b>전체 일정</b></Navbar.Brand>
          <Nav className="me-auto">
                <Nav.Link href="addSchedule">일정 등록</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;