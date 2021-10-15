import React, { useState } from 'react';
import '../../css/login.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { checkUser } from "../../action/auth";
import { savepassword } from "../../action/auth";
import { login } from "../../action/auth";
import { useDispatch, useSelector } from "react-redux";

function Login(){

    const [show, setShowItem] = useState(true);
    const [value, setValue] = useState("");
    const [password, setPassword] = useState();
    const [showFirstTimeUser, setFirstTimeUser] = useState();
    const [displayTextBox, setdisplayTextBox] = useState("block");
    const [displayContinueButton, setdisplayContinueButton] = useState("block");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let history = useHistory();

    const redirectToProject = () => {
        history.push('/projectlist/' + value)
    }

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
            console.log("HELLO" + response)
            showHideEmailTextbox(response.isEmailExist, response.isFirstTimeUser)
            console.log(response)
        }).catch(function (error) {
            console.log('Error: ' + error)
        })

    };

    const showHideEmailTextbox = (isEmailExist, isFirstTimeUser) => {
        console.log(isEmailExist);
        if(isEmailExist){
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
            
        }
    }

    const userSignIn =() => {
        const user = {
            emailId: value,
            password: password
        }

        dispatch(login(user)).then(function(response){
                if(response.status === 200 && response.data.message === "Success"){
                    redirectToTask();
                }
                else if(response.status === 200 && response.data.message === "Failure"){
                    setPassword("");
                    alert("Incorrect Password")

                }
            }).catch(function(error){
                console.log('Error: ' + error)
            })
    }

    const savePassword = () =>{
        const user = {
            emailId: value,
            password: userPassword
        }
        console.log(user);
        if(userPassword === confirmPassword){
            dispatch(savepassword(user)).then(function(response){
                if(response.status === 200){
                    console.log(response);

                    setShowItem(false); //To display the password textbox, user label and signin button
                    setFirstTimeUser(false); //To display the set password textbox,confirm password textbox, user label and save button
                    alert(response.status + "--" + response.data.message);
                }
            }).catch(function(error){
                console.log('Error: ' + error)
            })
        }
        else{
            alert("Password didn't match");
        }
    }
    
    return(
        <div>
            <div id="outer">
                <div id="inner">
                    <div style={{margin: "0 auto", position: "relative", top: "5%", left:"35%"}}>
                        {/* <img scr=""/> */}
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
                        <input id ="txtUserName" type="text" value={value} className="form-control" style={{ width:"300px"}} placeholder="Enter Email Id" onChange={event => {setValue(event.target.value)}} />
                    </div>
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
                        <input id = "txtSetPassword" type="password" value={userPassword} className="form-control" style={{ width:"300px"}} placeholder="Enter Password" onChange={event => {setUserPassword(event.target.value)}} />
                    </div>
                    <div  id="dvConfirmPassword" style={{display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id = "txtConfirmPassword" type="password" value={confirmPassword} className="form-control" style={{ width:"300px"}} placeholder="Confirm Password" onChange={event => {setConfirmPassword(event.target.value)}} />
                    </div>
                    <div  id="dvButton" style={{display:displayContinueButton, margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}} onClick={() => checkEmailId()}>CONTINUE</button>
                    </div>
                    <div  id="dvButton" style={{display:(show ? 'none' : 'block'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}} onClick={() => userSignIn()}>LOG IN</button>
                    </div>
                    <div  id="dvButton" style={{display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}} onClick={() => savePassword()}>SAVE PASSWORD</button>
                    </div>
                    <div  id="dvButton" style={{display:"block", margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight:"bold", paddingTop:"15px"}}>
                        Don't have an account? <a style={{color: 'royalblue'}} onClick={() => redirectToSignUp()}>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;