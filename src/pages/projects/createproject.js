import React, { useEffect, useState } from "react";
import "../../css/projects.css";
import { useSelector } from "react-redux";
import Navigation from '../../components/Navigation';
import ProjectServices from "../../services/projects";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProject(props){

    const { user: currentUser } = useSelector((state) => state.auth);

    const [project, setProject] = useState({
        projectName: "",
        projectType: "",
        projectKey: "",
        projectDesc: ""
    });

    const[isAddButtonDisabled, setAddButton] = useState(true);
    const[isNameValid, setIsNameValid] = useState(false);
    const[isKeyValid, setIsKeyValid] = useState(false);
    const[isProjectTypeSelected, setProjectType] = useState(false);

    useEffect(() => {
        if(project.projectName !== "" && project.projectType !== "0" && project.projectType !== '' 
        && project.projectKey !== ""){
            setAddButton(false);
        }
        else{
            setAddButton(true);
        }
    },[project.projectName, project.projectType, project.projectKey, project.projectDesc])

    let history = useHistory();

    const redirectToLoginIn = () => {
        history.push('/')
    }

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    
    
    const handleChange = event =>{
       
        const {id, value} = event.target;

        setProject({...project, [id] : value})
    };
    // const [projectName, setProjectName] = useState("");
    // const [projectType, setProjectType] = useState("0");
    // const [key, setKey] = useState("");
    // const [projectDesc, setProjectDesc] = useState("");

    const typeOptions = [
        {
            label: "--Select--",
            value: "0",
        },
        {
          label: "Development",
          value: "1",
        },
        {
          label: "Support",
          value: "2",
        },
        {
          label: "Testing",
          value: "3",
        }
    ];

    const createProject = () =>{
        const projectPayLoads = {
            projectName: project.projectName,
            projectType: project.projectType,
            projectKey: project.projectKey,
            projectDesc: project.projectDesc,
            userId: currentUser.id
        }
        
        ProjectServices.createproject(projectPayLoads).then((response) => {
            if(response.data.message === "Success"){
               alert("Project Saved Successfully");
               redirectToLoginIn();
            }
            else if(response.data.message === "Duplicate Project Key"){
                toast("Project Key already exists!")
            }
        }).catch((error) => {return false})
    }

    const showNameMessage = (val) => {
        if(val !== ""){
            setIsNameValid(false)
        }
        else{
            setIsNameValid(true)
        }
    }

    const showKeyMessage = (val) => {
        if(val !== ""){
            setIsKeyValid(false)
        }
        else{
            setIsKeyValid(true)
        }
    }

    return(
        <div>
            <Navigation isProj = {true} isUser = {false} isTask = {false} />
            <div className="flex-container">
                
                <div style={{width:'50%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                    Project Name <span style={{color:'red'}}>*</span>
                </div>
                <div style={{width:'50%', marginLeft: '20px',  marginTop: '25px'}}>
                    <input id="projectName" type="text" onChange={handleChange} onBlur={(event) => showNameMessage(event.target.value)} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '400px', backgroundColor: '#ffffff'}} />
                </div>
            </div>    
            <div style={{position:'absolute', zIndex:'999999', width:'274px', left:'544px'}}
                className={`alert alert-danger ${isNameValid ? 'alert-shown' : 'alert-hidden'}`}
                onTransitionEnd={() => setIsNameValid(false)}
                >
                <strong>Error:</strong> Please Enter a Project Name
            </div> 
            <div className="flex-container">
                <div style={{width:'50%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                    Project Type <span style={{color:'red'}}>*</span>
                </div>
                <div style={{width:'50%', marginLeft: '20px',  marginTop: '25px'}}>
                    <select id="projectType" className="selcls" style={{width:'150px'}} onChange={handleChange}>
                        
                        {typeOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex-container">
                <div style={{width:'50%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                    Key <span style={{color:'red'}}>*</span>
                </div>
                <div style={{width:'50%', marginLeft: '20px',  marginTop: '25px'}}>
                    <input id="projectKey" type="text" onChange={handleChange} onBlur={(event) => {showKeyMessage(event.target.value)} } style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '80px', backgroundColor: '#ffffff'}} />
                </div>
            </div>
            <div style={{position:'absolute', zIndex:'999999', width:'274px', left:'544px'}}
                className={`alert alert-danger ${isKeyValid ? 'alert-shown' : 'alert-hidden'}`}
                onTransitionEnd={() => setIsKeyValid(false)}
                >
                <strong>Error:</strong> Please Enter a Key 
            </div> 
            <div className="flex-container">
                <div style={{width:'50%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                    Description
                </div>
                <div style={{width:'50%', marginLeft: '20px',  marginTop: '25px'}}>
                    <textarea id="projectDesc" onChange={handleChange} row="4" name="content" style={{width:'400px'}}></textarea>
                </div>
            </div>
            <div style={{width:'940px', marginLeft: '50px',  marginTop: '15px', justifyContent: 'right', textAlign:'right'}}>
                {/* <button style="background-color:blue; height: 30px;  width: 80px; border-radius:5px; font-weight: bold; color:white; font-size:16px;" onclick="return go()">Save</button> */}
                <div><button className="btn btn-primary" id="btnAssignee" disabled={isAddButtonDisabled} onClick={() => createProject()}>Save</button></div>
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

export default CreateProject;