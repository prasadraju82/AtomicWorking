import React, {useState} from 'react';
import { useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import './Navigation.css';
import { useHistory } from 'react-router-dom';

const Navigation = (props) => {

    const [highlightProject, setHighLightProject] = useState(false);
    const [highlightUser, setHighLightUser] = useState(false);
    const [highlightTask, setHighLightTask] = useState(true);

    let history = useHistory();
    const { user: currentUser } = useSelector((state) => state.auth);

    const redirectToProject = () => {
        console.log('test1' + highlightProject);
        setHighLightProject(true);
        console.log('test2' + highlightProject);
        setHighLightUser(false);
        setHighLightTask(false);
        history.push('/projectlist/' + currentUser.id)
        console.log('test3' + highlightProject);
    }

    const redirectToUser = () => {
        history.push('/userlist')
    }

    return(
        <>
            <Navbar expand="lg" className="" style={{borderBottom: '3px solid #000000'}}>
                <Navbar.Brand href="#"><img src="../images/logo.sgv"  alt="Atomic" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '120px' }}
                    navbarScroll
                    >
                    <Nav.Link onClick = {() => {redirectToProject()}}><span style={{borderBottom:(props.isProj ? '3px solid #000000' : '0px solid #000000'),marginRight:'40px', fontWeight: 'bold', fontFamily:'Arial, Verdana'}}>Project</span></Nav.Link>
                    <Nav.Link onClick = {() => {redirectToUser()}}><span style={{borderBottom:(props.isUser ? '3px solid #000000' : '0px solid #000000'),marginRight:'40px', fontWeight: 'bold', fontFamily:'Arial, Verdana'}}>User</span></Nav.Link>
                    <NavDropdown title="Task" id="navbarScrollingDropdown" style={{fontWeight: 'bold', fontFamily:'Arial, Verdana'}}>
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