import React, { useState } from 'react';
import '../css/login.css';

function StartLogin(){
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
                    <div id="lblUserName" style={{textAlign:"center", display:'none', margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"normal", paddingTop:"15px"}}>
                        <div id ="dvUserName" style={{width:"300px"}}></div>
                    </div>
                    <div  id="dvUserName" style={{display: 'block', margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id ="txtUserName" type="text" value="" className="form-control" style={{ width:"300px"}} placeholder="Enter Email Id" />
                    </div>
                    <div  id="dvPassword" style={{display: 'none', margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id ="txtPassword" type="text" value="" className="form-control" style={{ width:"300px"}} placeholder="Enter Password" />
                    </div>
                    <div  id="dvButton" style={{display: 'block', margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}}>CONTINUE</button>
                    </div>
                    <div  id="dvButton" style={{display: 'none', margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <button type="button" className="btn btn-primary" style={{fontWeight:"bold", width:"300px"}} >LOG IN</button>
                    </div>
                    <div  id="dvButton" style={{display:"block", margin: "0 auto", position: "relative", top: "5%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        Don't have an account? <a onClick="">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartLogin;