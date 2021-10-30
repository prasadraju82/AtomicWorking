import React, { useState } from 'react';
 import '../../css/login.css';
import { useHistory } from 'react-router-dom';

import { checkUser } from "../../action/auth";
import { savepassword } from "../../action/auth";
import { login } from "../../action/auth";
import { useDispatch } from "react-redux";
import Logo from '../../images/project_logo_64.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(){

    //for loader
    const Loader = () => <div>Loading...</div>;
    const [loader, setLoader] = useState(false);

    const [show, setShowItem] = useState(true);
    const [value, setValue] = useState("");
    const [password, setPassword] = useState();
    const [showFirstTimeUser, setFirstTimeUser] = useState();
    const [displayTextBox, setdisplayTextBox] = useState("block");
    const [displayContinueButton, setdisplayContinueButton] = useState("block");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const[isContinueBtnDisabled, setContinueBtnDisabled] = useState(true);
    const[displayErrorMessage, setDisplayErrorMessage] = useState(false);
    const[isEmailExistMessage, setIsEmailExistMessage] = useState(false);
    const[isPasswordMatch, setIsPasswordMatchMessage] = useState(true);
    const [isShowingAlert, setShowingAlert] = useState(false);
    const[isPasswordInCorrect, setPasswordIncorrect] = useState(false);
    const[isPasswordMatched, setPasswordMatched] = useState(false);

    let history = useHistory();


    const redirectToTask = () => {
        history.push('/recenttasks/')
    }

    const redirectToSignUp = () => {
        history.push('/signup')
    }

    //const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const checkEmailId = () =>{
        //debugger;
        dispatch(checkUser({emailId:value}))
        .then((response) => {
           
            showHideEmailTextbox(response.isEmailExist, response.isFirstTimeUser)
          
        }).catch(function (error) {
            console.log('Error: ' + error)
        })

    };

    const showHideEmailTextbox = (isEmailExist, isFirstTimeUser) => {
       
        if(isEmailExist){
            setIsEmailExistMessage(false);
            setdisplayTextBox("none");
            setdisplayContinueButton("none");
            if(isFirstTimeUser){
                setFirstTimeUser(true);
            }
            else{
                setShowItem(false);
            }
        }
        else{
            setIsEmailExistMessage(true)
        }
    }

    const userSignIn =() => {
        const user = {
            emailId: value,
            password: password
        }
        showLoader();
        dispatch(login(user)).then(function(response){
                if(response.status === 200 && response.data.message === "Success"){
                    hideLoader();
                    redirectToTask();
                }
                else if(response.status === 200 && response.data.message === "Failure"){
                    hideLoader();
                    setPassword("");
                    setPasswordIncorrect(true)

                }
            }).catch(function(error){
                hideLoader();
                console.log('Error: ' + error)
            })
    }

    const savePassword = () =>{
        const user = {
            emailId: value,
            password: userPassword
        }
       
        if(userPassword === confirmPassword){
            dispatch(savepassword(user)).then(function(response){
                if(response.status === 200){
                   
                    setShowItem(false); //To display the password textbox, user label and signin button
                    setFirstTimeUser(false); //To display the set password textbox,confirm password textbox, user label and save button
                    
                    toast("Password saved successfully!");
                }
            }).catch(function(error){
                console.log('Error: ' + error)
            })
        }
        else{
           // toast("Password didn't match");
           setShowingAlert(false)
        }
    }

    const hideLoader = () => {
        setLoader(false)
    }
    
    const showLoader = () => {
        setLoader(true)
    }

    const setTextBox = (val) => {
        setValue(val)
        if(value !== ""){
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) {
                setContinueBtnDisabled(false)
            }
            else{
                setContinueBtnDisabled(true)
            }
        }
        else{
            setContinueBtnDisabled(true)
        }
    }

    const setErrorMessage = (val) => {
       
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) {
            setContinueBtnDisabled(false)
            setDisplayErrorMessage(false)
        }
        else{
            setContinueBtnDisabled(true)
            //toast("Invalid Email id");
            setDisplayErrorMessage(true)
           
        }
    }

    const setcnfPwd = (val) => {
        setConfirmPassword(val)
       
        if(userPassword === val){
            setIsPasswordMatchMessage(false)
        }
        else{
            setIsPasswordMatchMessage(true)
        }
    }

    const setuserPwd = (val) => {
        setUserPassword(val)
       
        if(confirmPassword === val){
            setIsPasswordMatchMessage(false)
        }
        else{
            setIsPasswordMatchMessage(true)
        }
    }

    const pwdMissMatchPassword = (val) => {
        if(userPassword !== val){
            setShowingAlert(true)
        }
        else{
            setIsPasswordMatchMessage(false)
        }
    }
    
    return(
        <div>
            <div id="outer">
                <div id="innerlogin">
                    <div style={{margin: "0 auto", position: "relative", top: "5%", left:"35%"}}>
                        <img src={Logo}  alt="Atomic" style={{marginLeft: 50, marginRight: 50}} />
                    </div>
                    <div style={{margin: "0 auto", position: "relative", top: "5%", left:"29%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        Log in to your account
                    </div>
                    <div id="lblUserName" style={{textAlign:"center", display:(show ? 'none' : 'block'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"normal", paddingTop:"15px"}}>
                        <div id ="dvUserName" style={{width:"300px"}}>{value}</div>
                    </div>
                    <div id="lblUserNameFirstTime" style={{textAlign:"center", display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"normal", paddingTop:"15px"}}>
                        <div id ="dvUserNameFirstTime" style={{width:"300px"}}>{value}</div>
                    </div>
                    <div  id="dvUserName" style={{display:displayTextBox, margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id ="txtUserName" type="text" value={value} className="form-control" style={{ width:"300px"}} placeholder="Enter Email Id" onChange={event => {setTextBox(event.target.value)}} onBlur={event => {setErrorMessage(event.target.value)}} />
                    </div>

                    {/* {
                        displayErrorMessage && (
                        <div id="lblErrorMessage" style={{textAlign:"center", margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", fontWeight:"normal", paddingTop:"4px"}}>
                            <div id ="dvErrorMessage" style={{width:"300px", color:'red'}}>Please enter a valid email id</div>
                        </div>)
                    } */}
                    <div style={{position:'absolute', zIndex:'999999', width:'300px', left:'102px', top:'20px'}}
                        className={`alert alert-danger ${displayErrorMessage ? 'alert-shown' : 'alert-hidden'}`}
                        onTransitionEnd={() => setDisplayErrorMessage(false)}
                        >
                        <strong>Error:</strong> Please enter a valid Email Id
                    </div>
                    <div style={{position:'absolute', zIndex:'999999', width:'500px'}}
                        className={`alert alert-danger ${isEmailExistMessage ? 'alert-shown' : 'alert-hidden'}`}
                        onTransitionEnd={() => setIsEmailExistMessage(false)}
                        >
                        <strong>Error:</strong> Email Id does not exist. Please Sign Up
                    </div>
                    {
                        // isEmailExistMessage && (
                        // <div id="lblErrorMessage" style={{textAlign:"center", margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", fontWeight:"normal", paddingTop:"4px"}}>
                        //     <div id ="dvErrorMessage" style={{width:"300px", color:'red'}}>Email Id does not exist <a style={{color: 'royalblue'}} onClick={() => redirectToSignUp()}>Sign Up</a></div>
                        // </div>)
                    }
                    
                    {/* {
                        displayTextBox && (
                            <div  id="dvUserName" style={{display:displayTextBox, margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                                <input id ="txtUserName" type="text" value={value} className="form-control" style={{ width:"300px"}} placeholder="Enter Email Id" onChange={event => {setValue(event.target.value)}} />
                            </div>
                        )
                        
                    } */}
                    
                    <div  id="dvPassword" style={{display:(show ? 'none' : 'block'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id = "txtPassword" type="password" value={password} className="form-control" style={{ width:"300px"}} placeholder="Enter Password" onChange={event => {setPassword(event.target.value)}} />
                    </div>
                    <div  id="dvSetPassword" style={{display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id = "txtSetPassword" type="password" value={userPassword} className="form-control" style={{ width:"300px"}} placeholder="Enter Password" onChange={event => {setuserPwd(event.target.value)}} />
                    </div>
                    <div  id="dvConfirmPassword" style={{display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id = "txtConfirmPassword" type="password" value={confirmPassword} className="form-control" style={{ width:"300px"}} placeholder="Confirm Password" onChange={event => {setcnfPwd(event.target.value)}} onBlur={(event) => pwdMissMatchPassword(event.target.value)} />
                    </div>
                    <div style={{position:'absolute', zIndex:'999999', width:'300px', left:'102px'}}
                        className={`alert alert-danger ${isShowingAlert ? 'alert-shown' : 'alert-hidden'}`}
                        onTransitionEnd={() => setShowingAlert(false)}
                        >
                        <strong>Error:</strong> Password not matching
                    </div>
                    <div  id="dvButton" style={{display:displayContinueButton, margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}} disabled={isContinueBtnDisabled} onClick={() => checkEmailId()}>CONTINUE</button>
                    </div>
                    <div  id="dvButton" style={{display:(show ? 'none' : 'block'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}} onClick={() => userSignIn()}>LOG IN</button>
                    </div>
                    <div  id="dvButton" style={{display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}} disabled={isPasswordMatch} onClick={() => savePassword()}>SAVE PASSWORD</button>
                    </div>
                    <div  id="dvButton" style={{display:(show ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight:"bold", paddingTop:"15px"}}>
                        Don't have an account? <a style={{color: 'royalblue'}} onClick={() => redirectToSignUp()}>Sign Up</a>
                    </div>
                    <div style={{position:'absolute', zIndex:'999999', width:'300px', left:'90px', top:'100px'}}
                        className={`alert alert-danger ${isPasswordInCorrect ? 'alert-shown' : 'alert-hidden'}`}
                        onTransitionEnd={() => setPasswordIncorrect(false)}
                        >
                        <strong>Error:</strong> Incorrect Password Entered
                    </div>
                    
                </div>
                
            </div>
            
            {loader ? <Loader /> : null}
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

export default Login;