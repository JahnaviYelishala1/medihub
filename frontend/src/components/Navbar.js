import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import {
  FaShoppingCart,
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand href="/"><strong>MediHub</strong></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mx-auto gap-4">
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3">
            {isLoggedIn ? (
              <>
                <Button variant="outline-dark" size="sm" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Button>
                <Button variant="outline-info" size="sm" onClick={() => navigate('/cart')}>
                  <FaShoppingCart /> View Cart
                </Button>
              </>
            ) : (
              <Button variant="outline-dark" size="sm" href="/login">
                <FaUserCircle /> Login
              </Button>
            )}

            <a href="https://github.com/JahnaviYelishala1" target="_blank" rel="noopener noreferrer"><FaGithub size={18} /></a>
            <a href="https://www.linkedin.com/in/jahnavi-yelishala-3121b9325/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={18} /></a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
