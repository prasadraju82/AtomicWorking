import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import UserServices from "../../services/users";
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'

function EditUserModal(props){
    
    const { user: currentUser } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        userName: "",
        userRole: "",
        gender: ""
    });

    useEffect(() => {
        UserServices.getUserById(props.userId).then((response) => {
            const userEdit = {
                userName: response.data.name,
                userRole: response.data.role,
                gender: response.data.gender
            }

            setUser(userEdit);
        })
    },[props.userId])

    const handleChange = event =>{
       
        const {id, value} = event.target;

        setUser({...user, [id] : value})
    };

    if (!currentUser) {
        return <Redirect to="/login" />;
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
        UserServices.updateProject(userPayLoads).then((response) => {
            if(response.data.message === "Success"){
               alert("Project Updated Successfully");
            }
        }).catch((error) => {console.log(error)})
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4 class="modal-title">Edit Project</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="modal-body">
                    <div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Key <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                               <span style={{fontFamily:'Arial'}}> {props.email} </span>
                            </div>
                        </div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Project Name <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                                <input id="userName" type="text" value={user.userName} onChange={handleChange} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '400px', backgroundColor: '#ffffff'}} />
                            </div>
                        </div>    
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Project Type <span style={{color:'red'}}>*</span>
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
                                Project Type <span style={{color:'red'}}>*</span>
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
                    <Button onClick={() => updateUser()}>Save</Button><Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditUserModal;