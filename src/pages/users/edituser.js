import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import UserServices from "../../services/users";
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditUserModal(props){
    
    const refreshParent = props.refreshUserList;
    const { user: currentUser } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        userName: "",
        userRole: "",
        gender: ""
    });
    const[isUpdateButtonDisabled, setUpdateButton] = useState(true);
    const[isNameValid, setIsNameValid] = useState(false);
    
    useEffect(() => {
        if(user.userName !== ""){
            setUpdateButton(false);
        }
        else{
            setUpdateButton(true);
        }
    },[user.userName])

    useEffect(() => {
        console.log('child ' + props.userId);
        UserServices.getUserById(props.userId).then((response) => {
           
            if(response !== undefined && response.data !== undefined){
                console.log('child ' + response.data.name);
                const userEdit = {
                    userName: response.data.name,
                    userRole: response.data.role,
                    gender: response.data.gender
                }

                setUser(userEdit);
            }
        })
    },[props.userId])

    const handleChange = event =>{
       
        const {id, value} = event.target;

        setUser({...user, [id] : value})
    };

    if (!currentUser) {
        return <Redirect to="/" />;
    }

    const roleOptions = [
        {
          label: "Admin",
          value: "1",
        },
        {
          label: "User",
          value: "2",
        }
    ];

    const genderOptions = [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        }
    ];

    const updateUser = () =>{
        const userPayLoads = {
            userName: user.userName,
            userRole: user.userRole,
            gender: user.gender,
            emailId: props.userId,
            updatedUser: currentUser._id
        }
        console.log(userPayLoads);
        console.log(currentUser);
        UserServices.upadteUser(userPayLoads).then((response) => {
            if(response.data.message === "Success"){
                props.onHide();
                refreshParent();
               toast("User Updated Successfully");
            }
        }).catch((error) => {console.log(error)})
    }

    const showNameMessage = (val) => {
        if(val !== ""){
            setIsNameValid(false)
        }
        else{
            setIsNameValid(true)
        }
    }

    return(
        <div>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4 class="modal-title">Edit User</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="modal-body">
                    <div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Email Id:
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                               <span style={{fontFamily:'Arial'}}> {props.userId} </span>
                            </div>
                        </div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                 Name: <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                                <input id="userName" type="text" value={user.userName} onChange={handleChange} onBlur={(event) => {showNameMessage(event.target.value)}} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '400px', backgroundColor: '#ffffff'}} />
                            </div>
                        </div>    
                        <div style={{position:'absolute', zIndex:'999999', width:'274px', left:'344px'}}
                            className={`alert alert-danger ${isNameValid ? 'alert-shown' : 'alert-hidden'}`}
                            onTransitionEnd={() => setIsNameValid(false)}
                            >
                            <strong>Error:</strong> Please Enter a Name
                        </div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Role: <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                                <select id="userRole" className="selcls" value={ user.userRole } onChange={handleChange}>
                                    {roleOptions.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Gender: <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                                <select id="gender" className="selcls" value={ user.gender } onChange={handleChange}>
                                    {genderOptions.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                    <Button onClick={() => updateUser()} disabled={isUpdateButtonDisabled}>Save</Button><Button className="btn btn-danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
        </div>
    )
}

export default EditUserModal;