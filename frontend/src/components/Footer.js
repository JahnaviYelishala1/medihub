import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-dark py-4 mt-5 border-top shadow-sm">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-0">&copy; {new Date().getFullYear()} Jahnavi-Yelishala. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="/about" className="text-dark me-3 text-decoration-none">About Us</a>
            <a href="/contact" className="text-dark me-3 text-decoration-none">Contact Us</a>
            <a href="https://github.com/JahnaviYelishala1" target="_blank" rel="noopener noreferrer" className="text-dark me-2">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/jahnavi-yelishala-3121b9325/" target="_blank" rel="noopener noreferrer" className="text-dark me-2">
              <FaLinkedin size={20} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
