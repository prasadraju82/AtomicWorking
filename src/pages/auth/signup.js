import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../../css/signup.css';
import { useHistory } from 'react-router-dom';
import { register } from "../../action/auth";
import Logo from '../../images/project_logo_64.png';
import AuthService from "../../services/auth.services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp(){

    const [user, setUser] = useState({
        name: "",
        emailId: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });
    //const[show, setShow] = useState(true);

    const[isSignUpButtonDisabled, setSignUpButton] = useState(true);
    const[isNameValid, setIsNameValid] = useState(false);
    const[isEmailValid, setIsEmailValid] = useState(false);
    const[isGenderSelected, setGender] = useState(false);
    const[isPasswordMatched, setPasswordMatch] = useState(false);
    const[showConfirmation, setConfirmation] = useState(false);

    const options = [
        {
          label: "--Select--",
          value: "N",
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

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    let history = useHistory();

    const redirectToLoginIn = () => {
        history.push('/')
    }
     
    const handleChange = event =>{
        
        const {id, value} = event.target;
        
        setUser({...user, [id] : value})
    };

    useEffect(() => {
        
        if(user.name !== "" && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.emailId)) && user.gender !== "N" && user.gender !== '' 
        && user.password !== "" && user.confirmPassword !== "" && user.password === user.confirmPassword){
            
            setSignUpButton(false);
        }
        else{
            
            setSignUpButton(true);
         
        }
    },[user.name, user.emailId, user.password, user.confirmPassword, user.gender])

    const addUser = () => {
        if(user.password !== user.confirmPassword){
            toast("Password didn't matched");
        }
        else{
            const userPayLoad ={
                name: user.name,
                emailId: user.emailId,
                password: user.password,
                gender: user.gender
            }
            console.log(userPayLoad);
            AuthService.register(userPayLoad).then(function(response) {
                
                if(response.data.message === "Email Id is already in use!")
                {
                    toast(response.data.message);
                }
                else if(response.data.message === "Successful"){
                    setConfirmation(true);   
                }
                
            }).catch(function (error) {
                toast('Error: ' + error)
            })
        }
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

    const showCnfPwdMessage = (val) => {
        if(user.password === val){
            setPasswordMatch(false);
        }
        else{
            setPasswordMatch(true);
        }
    }
    return(
        <div>
            <div id="outer">
                { !showConfirmation && 
                    (
                        <div id="inner">
                            <div style={{margin:"0 auto", position:"relative", top:"3%", left:"35%"}}>
                                <img src={Logo}  alt="Atomic" style={{marginLeft: 50, marginRight: 50}} />
                            </div>
                            <div style={{margin: "0 auto", position:"relative", top:"3%", left:"29%", fontFamily:"Arial, Helvetica, sans-serif", fontSize: "1.25vw", fontWeight: "bold", paddingTop:"15px"}}>
                                Create an account
                            </div>
                            <div id="lblUserName" style={{textAlign:"left", display:"block", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1vw", fontWeight: "bold",paddingTop:"15px"}}>
                                <div id="dvUserName" style={{width:"300px"}}>Name:<span style={{color:"red"}}>*</span></div>
                            </div>
                            <div id="Div5" style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                            <input id="name" type ="text" value={user.name}  class="form-control" 
                                            style={{width:"60%"}} placeholder="Enter Name" onChange={handleChange} onBlur = {(event) => {showNameMessage(event.target.value)}} />
                            </div>
                            <div style={{position:'absolute', zIndex:'999999', width:'300px', left:'102px'}}
                                className={`alert alert-danger ${isNameValid ? 'alert-shown' : 'alert-hidden'}`}
                                onTransitionEnd={() => setIsNameValid(false)}
                                >
                                <strong>Error:</strong> Please Enter a Name
                            </div>
                            <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"15px"}}>
                            <div style={{width:"300px"}}>Email:<span style={{color:"red"}}>*</span></div>
                            </div>
                            <div style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                            <input id="emailId" type ="text" value={user.emailId} class="form-control" 
                                            style={{width:"60%"}} placeholder="Enter Email Id" onChange={handleChange} onBlur = {(event) => {showEmailMessage(event.target.value)}} />
                            </div>
                            <div style={{position:'absolute', zIndex:'999999', width:'300px', left:'102px'}}
                                className={`alert alert-danger ${isEmailValid ? 'alert-shown' : 'alert-hidden'}`}
                                onTransitionEnd={() => setIsEmailValid(false)}
                                >
                                <strong>Error:</strong> Please Enter a valid EMail Id
                            </div>
                            <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"15px"}}>
                            <div style={{width:"300px"}}>Select Gender:<span style={{color:"red"}}>*</span></div>
                            </div>
                            <div style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                            <select id="gender" class="selcls" style={{width:"120px"}} value={user.gender} onChange={handleChange}>
                                    {options.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div  id="dvSetPassword" style={{display:'block', margin: "0 auto", position: "relative", top: "3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                                <input id = "password" type="password" value={user.password} className="form-control"
                                    style={{ width:"60%"}} placeholder="Enter Password" onChange={handleChange} />
                            </div>
                            <div  id="dvConfirmPassword" style={{display:'block', margin: "0 auto", position: "relative", top: "3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                                <input id = "confirmPassword" type="password" value={user.confirmPassword} className="form-control"
                                    style={{ width:"60%"}} placeholder="Confirm Password" onChange={handleChange} onBlur={(event) => {showCnfPwdMessage(event.target.value)}} />
                            </div>
                            <div style={{position:'absolute', zIndex:'999999', width:'300px', left:'102px'}}
                                className={`alert alert-danger ${isPasswordMatched ? 'alert-shown' : 'alert-hidden'}`}
                                onTransitionEnd={() => setPasswordMatch(false)}
                                >
                                <strong>Error:</strong> Password doesn't match
                            </div>
                            <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1.5px", fontWeight: "bold",paddingTop:"15px"}}>
                            <button type="button" class="btn btn-primary" style={{fontWeight:"bold", width:"60%", fontSize: "1.5vw"}} disabled={isSignUpButtonDisabled}
                                onClick={() => addUser()}>SIGN UP</button>
                            </div>
                            <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1vw", fontWeight: "bold",paddingTop:"15px"}}>
                                Already have an account? <a style={{color: 'royalblue'}} onClick={() => redirectToLoginIn()}>Sign In</a>
                            </div>
                        </div>
                    )
                }
                
                {
                    showConfirmation && (
                        <div>
                            <div style={{margin:"0 auto", position:"relative", top:"1%", left:"44%"}}>
                                <img src={Logo}  alt="Atomic" style={{marginLeft: 50, marginRight: 50}} />
                            </div>
                            <div id="confText" style={{ paddingLeft:"20px", paddingRight:"20px", margin: "0 auto", position:"relative", top:"5%", backgroundColor:"#ffffff", width:"80%", left:"1%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold", paddingTop:"15px"}}>
                            A confirmation e-mail has been sent to your mail box <span id="txtEmail" style={{fontSize:"15px"}}></span>. Please confirm it and reset your password from the link.
                                <hr />
                                <br />
                            </div>
                        </div>
                        
                    )
                }
                
          </div>
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

export default SignUp;