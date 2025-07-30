import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
          🏠 HousePredictor KE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-dark">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-dark">Contact</Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-dark">Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className="btn btn-primary px-4 ms-2 text-white">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
