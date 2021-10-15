import React, { useState } from 'react';
import { useSelector } from "react-redux";
import Navigation from '../../components/Navigation';
import UserServices from "../../services/users";
import { Redirect } from 'react-router-dom';

function AddUser(props){
    
    const { user: currentUser } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        userName: "",
        userEmail: "",
        gender: "",
        userRole: ""
    });

    if (!currentUser) {
        return <Redirect to="/login" />;
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
            userEmail: user.userEmail,
            gender: user.gender,
            userRole: user.userRole,
            createdUser: currentUser.id
        }
        console.log(userPayLoads);
        console.log(currentUser);
        UserServices.addUser(userPayLoads).then((response) => {
            if(response.data.message === "Success"){
               alert("User Added Successfully");
            }
        }).catch((error) => {console.log(error)})
    }

    return(
        <div>
            <Navigation />
            <div className="flex-container">
                <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                     Name <span style={{color:'red'}}>*</span>
                </div>
                <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                    <input id="userName" type="text" onChange={handleChange} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '28%', backgroundColor: '#ffffff'}} />
                </div>
            </div>  
            <div className="flex-container">
                
                <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                     Email Id <span style={{color:'red'}}>*</span>
                </div>
                <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                    <input id="userEmail" type="text" onChange={handleChange} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '28%', backgroundColor: '#ffffff'}} />
                </div>
               
                
            </div>   
            <div className="flex-container">
                <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                    Role <span style={{color:'red'}}>*</span>
                </div>
                <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                    <select id="userRole" className="selcls" onChange={handleChange}>
                        {roleOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex-container">
                <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                    Gender <span style={{color:'red'}}>*</span>
                </div>
                <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                    <select id="gender" className="selcls" onChange={handleChange}>
                        {genderOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex-container">
                {/* <button style="background-color:blue; height: 30px;  width: 80px; border-radius:5px; font-weight: bold; color:white; font-size:16px;" onclick="return go()">Save</button> */}
                <div style={{marginLeft: '50px',  marginTop: '5px', justifyContent: 'right', textAlign:'right', alignContent: 'right', alignItems:'right'}}><button className="btn btn-primary" id="btnAssignee" onClick={() => addUser()}>Save</button></div>
            </div>
        </div>
    )
}

export default AddUser;