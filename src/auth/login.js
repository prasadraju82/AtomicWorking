import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';

function Login(){

    const [show, setShowItem] = useState(true);
    const [value, setValue] = useState("");
    const [password, setPassword] = useState();
    const [showFirstTimeUser, setFirstTimeUser] = useState();
    const [displayTextBox, setdisplayTextBox] = useState("block");
    const [displayContinueButton, setdisplayContinueButton] = useState("block");
    const hideEmailTextbox = () =>{
        //debugger;
        const user = {
            emailId: value
        }
        console.log(user);
        // axios.post('http://localhost:5000/auth/signin', user, { headers: {
        //     'Content-Type': 'application/json'
        // } })
        // .then(res => { console.log('response: ' + res.data.isEmailExist) }).catch(err => { console.log('error response: ' + err) })
    
        // axios.post("http://localhost:5000/auth/signin", {
        //     headers: {
        //     "Content-Type": "application/json",
        //     "Accept": "application/json",
        //     "Authorization": ""
        //     },
        //     data: {
        //     "emailId":"prasadraju82@gmail.com"
            
        //     }
        // })
        // .then(response => response.json())
        // .then(response => console.log("hi" + response))
        // .catch(err => console.log("error " + err));
        
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/signin',
            headers: { 'Content-Type': 'application/json',
            "Accept": "application/json" },
            data: JSON.stringify({
                emailId: value
            })
        }).then(function (response) {
            showHideEmailTextbox(response.data.isEmailExist, response.data.isFirstTimeUser)
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

    // const setInitialPassword = () => {
    //     setFirstTimeUser(true);
    // }
    
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
                        <input id = "txtPassword" type="text" value={password} className="form-control" style={{ width:"300px"}} placeholder="Enter Password" onChange={event => {setPassword(event.target.value)}} />
                    </div>
                    <div  id="dvSetPassword" style={{display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id = "txtSetPassword" type="text" value={password} className="form-control" style={{ width:"300px"}} placeholder="Enter Password" onChange={event => {setPassword(event.target.value)}} />
                    </div>
                    <div  id="dvConfirmPassword" style={{display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id = "txtConfirmPassword" type="text" value={password} className="form-control" style={{ width:"300px"}} placeholder="Confirm Password" onChange={event => {setPassword(event.target.value)}} />
                    </div>
                    <div  id="dvButton" style={{display:displayContinueButton, margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}} onClick={() => hideEmailTextbox()}>CONTINUE</button>
                    </div>
                    <div  id="dvButton" style={{display:(show ? 'none' : 'block'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}}>LOG IN</button>
                    </div>
                    <div  id="dvButton" style={{display:(showFirstTimeUser ? 'block' : 'none'), margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}}>SAVE PASSWORD</button>
                    </div>
                    <div  id="dvButton" style={{display:"block", margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        {/* Don't have an account? <a onClick="">Sign Up</a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;