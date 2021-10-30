import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Navigation from '../../components/Navigation';
import UserServices from "../../services/users";
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser(props){
    
    const { user: currentUser } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        userName: "",
        emailId: "",
        gender: "",
        userRole: ""
    });

    const[isAddButtonDisabled, setAddButton] = useState(true);
    const[isNameValid, setIsNameValid] = useState(false);
    const[isEmailValid, setIsEmailValid] = useState(false);
    

    useEffect(() => {
        if(user.userName !== "" && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.emailId)) && user.gender !== "0" && user.gender !== '' 
        && user.userRole !== "" && user.userRole !== "0"){
            setAddButton(false);
        }
        else{
            setAddButton(true);
        }
    },[user.userName, user.emailId, user.gender, user.userRole])

    if (!currentUser) {
        return <Redirect to="/" />;
    }

    const handleChange = (event) =>{
        const {id, value} = event.target;

        setUser({...user, [id] : value})
    }

    

    const roleOptions = [
        {
            label: "--Select--",
            value: "0",
        },
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
            label: "--Select--",
            value: "0",
        },
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        }
    ];

    const addUser = () =>{
        const userPayLoads = {
            userName: user.userName,
            emailId: user.emailId,
            gender: user.gender,
            userRole: user.userRole,
            createdUser: currentUser.id
        }
        
        UserServices.addUser(userPayLoads).then((response) => {
           
            if(response.data.message === "Success"){
               toast("User Added Successfully");
            }
            else if(response.data.message === "Email Id is already in use!"){
                toast("Email Id is already in use!");
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

    const showEmailMessage = (val) => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) {
            setIsEmailValid(false)
        }
        else{
            setIsEmailValid(true)
        }
    }

    return(
        <div>
            <Navigation isProj = {false} isUser = {true} isTask = {false}  />

            <Container fluid>
                <div className="row">
                    <div className="col-sm-12">
                        <div style={{margin: "0 auto", position:"relative", top:"6%", textAlign: "center", fontFamily:"Arial, Helvetica, sans-serif", fontSize: "1.25vw", fontWeight: "bold", paddingTop:"15px"}}>
                            Add User
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <div style={{marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', fontSize: "1vw", fontWeight: "bold"}}>
                            Name <span style={{color:'red'}}>*</span>
                        </div>
                        <div style={{marginTop: '5px'}}>
                            <input id="userName" type="text" onChange={handleChange} onBlur = {(event) => {showNameMessage(event.target.value)}}  style={{border: 'thin solid #CCCCCC', borderRadius:'5px', width: '100%', backgroundColor: '#ffffff'}} />
                        </div>
                        <div style={{position:'absolute', zIndex:'999999', width:'274px'}}
                            className={`alert alert-danger ${isNameValid ? 'alert-shown' : 'alert-hidden'}`}
                            onTransitionEnd={() => setIsNameValid(false)}
                            >
                            <strong>Error:</strong> Please Enter a Name
                        </div> 
                    </div>
                    <div className="col-sm-4">

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <div style={{marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', fontSize: "1vw", fontWeight: "bold"}}>
                            Email Id <span style={{color:'red'}}>*</span>
                        </div>
                        <div style={{marginLeft: '0px',  marginTop: '5px'}}>
                            <input id="emailId" type="text" onChange={handleChange} onBlur={(event) => {showEmailMessage(event.target.value)}} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', width: '100%', backgroundColor: '#ffffff'}} />
                        </div>
                        <div style={{position:'absolute', zIndex:'999999', width:'290px'}}
                            className={`alert alert-danger ${isEmailValid ? 'alert-shown' : 'alert-hidden'}`}
                            onTransitionEnd={() => setIsEmailValid(false)}
                            >
                            <strong>Error:</strong> Please Enter a valid Email Id
                        </div> 
                    </div>
                    <div className="col-sm-4">

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <div style={{marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', fontSize: "1vw", fontWeight: "bold"}}>
                            Role <span style={{color:'red'}}>*</span>
                        </div>
                        <div style={{marginLeft: '0px',  marginTop: '5px'}}>
                            <select id="userRole" className="selcls" onChange={handleChange}>
                                {roleOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <div style={{marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', fontSize: "1vw", fontWeight: "bold"}}>
                            Gender <span style={{color:'red'}}>*</span>
                        </div>
                        <div style={{marginLeft: '0px',  marginTop: '5px'}}>
                            <select id="gender" className="selcls" onChange={handleChange}>
                                {genderOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                    <div style={{ marginTop: '5px', justifyContent: 'right', textAlign:'right', alignContent: 'right', alignItems:'right'}}>
                        <button className="btn btn-primary" id="btnAssignee" onClick={() => addUser()} disabled={isAddButtonDisabled}>Save</button>
                    </div>
                    </div>
                    <div className="col-sm-4">

                    </div>
                </div>
            </Container>
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

export default AddUser;