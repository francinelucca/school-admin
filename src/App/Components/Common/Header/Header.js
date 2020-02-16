import React from 'react'
import "./Header.css"
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';


const Header = () => (
    <header>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/classes">School Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/students">Students</Nav.Link>
                <Nav.Link href="/teachers">Teachers</Nav.Link>
                <Nav.Link href="/classes">Classes</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    </header>
)

export default Header;