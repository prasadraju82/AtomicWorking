import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import './Navigation.css';
import { useHistory } from 'react-router-dom';
import Logo from '../images/project_logo_64.png';
import { logout } from "../action/auth";
import { Redirect } from 'react-router-dom';

const Navigation = (props) => {

    const [userInitials, setUserInitials] = useState();
    const [logoutPanel, setLogoutPanel] = useState(false);
    const dispatch = useDispatch();

    let history = useHistory();
    const { user: currentUser } = useSelector((state) => state.auth);

    const redirectToProject = () => {
        history.push('/projectlist')
    }

    const redirectToUser = () => {
        history.push('/userlist')
    }

    const redirectToRecentTask = () => {
        history.push('/recenttasks')
    }

    const redirectToAllTask = () => {
        history.push('/alltasks')
    }

    const redirectToCreateTask = () => {
        history.push('/createtask')
    }

    const getInitials = (username) => {
        let user = username.split(' ')
        let firstName = "";
        let secondName = "";
        if(user.length > 1){
            firstName = user[0];
            secondName = user[1];
            let firstLetter = firstName.charAt(0);
            let secondLetter = secondName.charAt(0);

            return firstLetter + secondLetter
        }
        else if(user.length === 1){
            firstName = user[0];
            let firstLetter = firstName.charAt(0);
            let secondLetter = secondName.charAt(1);
            return firstLetter + secondLetter;
        }
    }  

    useEffect(() => {
        if (!currentUser) {
            return <Redirect to="/login" />;
        }

       let userInitial = getInitials(currentUser.name);
       setUserInitials(userInitial);
    },[currentUser])

    const logOut = () => {
        localStorage.removeItem("user");
        history.push('/')
        
      };

    return(
        <>
            <Navbar bg="light" sticky="top" expand="lg" className="" style={{borderBottom: '1px solid #dcdcdc', paddingBottom: '0px', paddingTop: '1px', boxShadow: '0 0 10px gray' }}>
                <Navbar.Brand href="#"><img src={Logo}  alt="Atomic" style={{marginLeft: 50, marginRight: 50}} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '120px' }}
                    navbarScroll
                    >
                    <Nav.Link onClick = {() => {redirectToProject()}} style={{borderBottom:(props.isProj ? '3px solid #000000' : '0px solid #000000'), color:(props.isProj ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,.55)'),marginRight:'40px',marginLeft:'5px', fontWeight: 'bold', fontFamily:'Arial, Verdana'}}><span>Project</span></Nav.Link>
                    <Nav.Link onClick = {() => {redirectToUser()}} style={{borderBottom:(props.isUser ? '3px solid #000000' : '0px solid #000000'), color:(props.isUser ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,.55)'), marginRight:'40px',marginLeft:'5px', fontWeight: 'bold', fontFamily:'Arial, Verdana'}}><span>User</span></Nav.Link>
                    <NavDropdown title={<span> Task</span>} id="navbarScrollingDropdown" style={{borderBottom:(props.isTask ? '3px solid #000000' : '0px solid #000000'), color:(props.isTask ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,.55)'),marginRight:'80px',marginLeft:'5px', fontWeight: 'bold', fontFamily:'Arial, Verdana'}}>
                        <NavDropdown.Item onClick = {() => {redirectToRecentTask()}}>Recent Tasks</NavDropdown.Item>
                        <NavDropdown.Item onClick = {() => {redirectToAllTask()}}>All Tasks</NavDropdown.Item>
                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item> */}
                    </NavDropdown>
                        <button className="btn btn-dark my-2 my-sm-0" onClick={() => {redirectToCreateTask()}} >Create Task</button>
                    </Nav>
                    {/* <Nav className="justify-content-end" style={{ width: "38%" }}>
                        <a onClick={logOut}>Logout</a>
                    </Nav> */}
                    <Nav className="justify-content-end" style={{ width: "58%" }}>
                        <div>
                            <div onMouseEnter={() => {setLogoutPanel(true)}} onMouseLeave={() => {setLogoutPanel(false)}} style={{marginLeft: '15px', height:'40px', width:'40px', paddingTop:'7px', fontFamily: 'Arial, Helvetica, sans-serif', paddingLeft:'5px', paddingRight:'5px', borderRadius:'20px', backgroundColor:'#EF6C00', fontWeight: 'bold', textAlign:'center', verticalAlign:'middle'}}>
                                {userInitials}
                            </div>
                            {
                                logoutPanel && (<div style={{position:'absolute', backgroundColor:'#dcdcdc', padding:6}}
                                    onMouseEnter={() => {setLogoutPanel(true)}} onMouseLeave={() => {setLogoutPanel(false)}}>
                                        <a onClick={logOut}>Logout</a>
                                </div>)
                            }
                            
                        </div>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation;