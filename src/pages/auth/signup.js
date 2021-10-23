import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../../css/signup.css';
import { useHistory } from 'react-router-dom';
import { register } from "../../action/auth";
import Logo from '../../images/project_logo_64.png';

function SignUp(){

    const [user, setUser] = useState({
        name: "",
        emailId: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });
    //const[show, setShow] = useState(true);

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
     // useEffect(() => {console.log("input state is", test)}, [test])
    const handleChange = event =>{
        console.log(event.target.value);
        //console.log(event.target);
        const {id, value} = event.target;

        console.log(id);
        console.log(value);
        // setState(prevState => ({
        //     ...prevState, 
        //     [id] : value
        // }))
        
        setUser({...user, [id] : value})
    };

    const addUser = () => {
        if(user.password !== user.confirmPassword){
            alert('Password not matched');
        }
        else{
            const userPayLoad ={
                name: user.name,
                emailId: user.emailId,
                password: user.password,
                gender: user.gender
            }
            console.log(userPayLoad);
            dispatch(register(userPayLoad)).then(function(response) {
                console.log({message})
                alert(response);
            })
        }
    }
    return(
        <div>
            <div id="outer">
                <div id="inner">
                    <div style={{margin:"0 auto", position:"relative", top:"3%", left:"35%"}}>
                        <img src={Logo}  alt="Atomic" style={{marginLeft: 50, marginRight: 50}} />
                    </div>
                    <div style={{margin: "0 auto", position:"relative", top:"3%", left:"29%", fontFamily:"Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight: "bold", paddingTop:"15px"}}>
                        Create an account
                    </div>
                    <div id="lblUserName" style={{textAlign:"left", display:"block", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"15px"}}>
                       <div id="dvUserName" style={{width:"300px"}}>Name:<span style={{color:"red"}}>*</span></div>
                    </div>
                    <div id="Div5" style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                       <input id="name" type ="text" value={user.name}  class="form-control" 
                                    style={{width:"300px"}} placeholder="Enter Name" onChange={handleChange} />
                    </div>
                    <div id="Div6" style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"15px"}}>
                       <div id="Div7" style={{width:"300px"}}>Email:<span style={{color:"red"}}>*</span></div>
                    </div>
                    <div id="Div1" style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                       <input id="emailId" type ="text" value={user.emailId} class="form-control" 
                                    style={{width:"300px"}} placeholder="Enter Email Id" onChange={handleChange} />
                    </div>
                    <div id="Div8" style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"15px"}}>
                       <div id="Div9" style={{width:"300px"}}>Select Gender:<span style={{color:"red"}}>*</span></div>
                    </div>
                    <div id="Div3" style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                       <select id="gender" class="selcls" style={{width:"120px"}} value={user.gender} onChange={handleChange}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div  id="dvSetPassword" style={{display:'block', margin: "0 auto", position: "relative", top: "3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id = "password" type="password" value={user.password} className="form-control"
                             style={{ width:"300px"}} placeholder="Enter Password" onChange={handleChange} />
                    </div>
                    <div  id="dvConfirmPassword" style={{display:'block', margin: "0 auto", position: "relative", top: "3%", left:"19%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "18px", fontWeight:"bold", paddingTop:"15px"}}>
                        <input id = "confirmPassword" type="password" value={user.confirmPassword} className="form-control"
                             style={{ width:"300px"}} placeholder="Confirm Password" onChange={handleChange} />
                    </div>
                    <div id="Div2" style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"15px"}}>
                       <button type="button" class="btn btn-primary" style={{fontWeight:"bold", width:"300px"}}
                        onClick={() => addUser()}>SIGN UP</button>
                    </div>
                    <div id="Div4" style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"20%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"15px"}}>
                        Already have an account? <a style={{color: 'royalblue'}} onClick={() => redirectToLoginIn()}>Sign In</a>
                    </div>
                </div>
                <div id="confText" style={{display:"none", paddingLeft:"20px", paddingRight:"20px", margin: "0 auto", position:"relative", top:"5%", backgroundColor:"#ffffff", width:"80%", left:"1%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold", paddingTop:"15px"}}>
                    A confirmation e-mail has been sent to your mail box <span id="txtEmail" style={{fontSize:"15px"}}></span>. Please confirm it and reset your password from the link.
                <hr />
                    <br />
                </div>
          </div>
        </div>
    )
}

export default SignUp;