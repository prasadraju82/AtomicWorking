import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
// import { useSelector } from "react-redux";


const Navbar = () => {

   // const { user: currentUser } = useSelector((state) => state.auth);
    //var projectLink = '/projectlist/' + currentUser
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
            <NavLink to='/projectlist/' activeStyle>
                Project
            </NavLink>
            <NavLink to='/task' activeStyle>
                Tasks
            </NavLink>
            <NavLink to='/users' activeStyle>
                Users
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		    <NavBtnLink to='/createtask'>Create Task</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
