import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Navigation from '../../components/Navigation';
import UserServices from "../../services/users";
import { Redirect } from 'react-router-dom';
import EditUserModal from './edituser';

function UserList(props){
    const { user: currentUser } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);
    const [userEditModalShow, setUserEditModalShow] = React.useState(false);
    const [userId, setUserId] = useState("");
    const role = currentUser.role;

    useEffect(() => {
        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        UserServices.getAllUsers().then(response => {
            console.log(response);
            setUserData(response.data);
        })
        // axios.get(API_URL + "projectlist/" + userEmail).then(res => {
        //     console.log(res);
        //     setProjectData(res.data);
        // })
    },[])

    useEffect(() => {
        if(currentUser.role === 1){
            setIsAdmin(true);
        }
        else{
            setIsAdmin(false);
        }
    }, [currentUser])

    const openEdit = (isModal, key) => {
        setUserEditModalShow(isModal);
        setUserId(key);
    }

    return(
        <div>
            <Navigation />
            <div style={{textAlign:'right', marginRight:'200px'}}>
                   { isAdmin && <button type="button" className="btn btn-primary">CREATE USER</button> } 
                </div>
                <div>
                    User List
                </div>
                <div>
                       
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Role</th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            userData.map((user,index) => {
                                                return(
                                                    <tr>
                                                        <td></td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td> {user.role === 1 ? 'Admin' : 'User' }</td>
                                                        <td>
                                                            <button type="button" className="btn btn-primary" onClick={() => openEdit(true, user.email)}>Edit</button>
                                                            <button type="button" className="btn btn-danger" style={{marginLeft:'20px'}}>Delete</button>
                                                        </td>
                                                    </tr>
                                                    
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
                <EditUserModal   show = {userEditModalShow} onHide={() => setUserEditModalShow(false)} userId = {userId}/>    
        </div>
    )
}

export default UserList;