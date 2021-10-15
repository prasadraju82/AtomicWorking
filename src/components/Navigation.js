import React from 'react';
import { useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import './Navigation.css';
import { useHistory } from 'react-router-dom';

const Navigation = () => {

    let history = useHistory();
    const { user: currentUser } = useSelector((state) => state.auth);

    const redirectToProject = () => {
        history.push('/projectlist/' + currentUser.id)
    }

    return(
        <>
            <Navbar expand="lg" className="color-nav">
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '120px' }}
                    navbarScroll
                    >
                    <Nav.Link href="/projectlist/">Home</Nav.Link>
                    <Nav.Link onClick = {() => {redirectToProject()}}>Link</Nav.Link>
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Project</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                        Link
                    </Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation;