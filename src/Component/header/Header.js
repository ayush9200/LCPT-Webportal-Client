import React from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';

// import{ useState, useEffect } from "react";

// const [headerShow, setHeaderShow] = useState(false)

// useEffect(() => {
// if(window.location.href.includes("login")||(window.location.href.includes("userRegistration"))){
//   setHeaderShow(false)
// }
// else{
//   setHeaderShow(true)
// }

// }, [])
function Header() {
  var loginPgCall = () => {
    if(sessionStorage.getItem("orgId"))
    sessionStorage.removeItem("orgId")
    if(sessionStorage.getItem("userType"))
    sessionStorage.removeItem("userType")
    if(sessionStorage.getItem("OtherHomeId"))
    sessionStorage.removeItem("OtherHomeId")
    if(sessionStorage.getItem("OtherOrgId"))
    sessionStorage.removeItem("OtherOrgId")
    if(sessionStorage.getItem("homeId"))
    sessionStorage.removeItem("homeID")
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
            <Nav.Link href="">About Us</Nav.Link>
            <Nav.Link href="">Contact Us</Nav.Link>
            {/* <Nav.Link href="/organisation/1">Organization</Nav.Link>
            <Nav.Link href="/admin_home">Administrator</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
            {/* <div>
      {headerShow===false ? (
        <div></div>
      ) : ( */}
            <Button bsStyle="primary" onClick={loginPgCall}>Log In</Button>
            {/* )}
            </div> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;