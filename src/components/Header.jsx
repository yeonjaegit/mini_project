import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

function Header() {
  return (
    <>
      <Navbar className='header' data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/"><b>오늘 일정</b></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="weekSchedule">이번 주 일정</Nav.Link>
            <Nav.Link href="allSchedule">전체 일정</Nav.Link>
            <Nav.Link href="addSchedule">일정 등록</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;