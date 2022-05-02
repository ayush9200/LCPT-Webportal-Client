import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

function Header() {
  var loginPgCall = () => {
    window.location = ("/login")


  }


  // const [isloggedIn, setIsLoggedIn] = useState(false);
  // setIsLoggedIn(true)

  // if (isloggedIn) {
  //   return (<Navigate to="" />)
  // }

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">LCPT Orientation Webportal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav pullright="true">
            <Nav.Link href="/user">User</Nav.Link>
            <Nav.Link href="/organisation/1">Organization</Nav.Link>
            <Nav.Link href="/admin_home">Administrator</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
            <Button bsStyle="primary" onClick={loginPgCall}>Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;