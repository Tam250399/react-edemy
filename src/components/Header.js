import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  // const location = useLocation();
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Nav href="/">Tâm Công</Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                {" "}
                Trang chủ
              </NavLink>

              <NavLink className="nav-link" to="/users">
                {" "}
                Profile
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Đăng nhập</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
