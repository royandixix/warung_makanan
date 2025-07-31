import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import "../index.css"; // Import CSS custom untuk styling tambahan

const NavbarComponent = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="sticky-top custom-navbar"
    >
      <Container>
        <Navbar.Brand href="#home" className="brand">
          Warung Kang Roy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="#link" className="nav-link-custom">Link</Nav.Link>
            <NavDropdown
              title="Kategori"
              id="basic-nav-dropdown"
              className="nav-dropdown-custom"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;