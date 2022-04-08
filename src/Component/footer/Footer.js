import React from "react";
import { Button, Navbar, Container, Row, Col, Nav, NavDropdown } from 'react-bootstrap';

const Footer = () => {
return (
	<Navbar bg="light" expand="lg" class="sticky-bottom">
        <Container>
            <Row>
                <Col>
                        <h4>About Us</h4>
                        <ul class="list-unstyled">
                        <li>Home</li>
                        <li>User</li>
                        <li>Admin</li>
                        </ul>
                </Col>
                <Col>
                    <h4>Contact Us</h4>
                        <ul class="list-unstyled">
                        <li>Home</li>
                        <li>User</li>
                        <li>Admin</li>
                        </ul>
                </Col>
                <Col>
               
                </Col>
            </Row>
                <div class="footer-bottom">
                    <p class="test-xs-center">
                        &copy;{new Date().getFullYear()} LCPT Webportal - All Rights Reserved
                    </p>
                </div>
        </Container>
      </Navbar>
);
};
export default Footer;
