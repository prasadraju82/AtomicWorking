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

    const redirectToProjectList = () => {
        history.push('/projectlist')
    }

    if (!currentUser) {
        return <Redirect to="/" />;
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
               redirectToProjectList();
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
        <div className="inner">
            <Navigation isProj = {true} isUser = {false} isTask = {false} />
            <div>
                <div style={{margin: "0 auto", position:"relative", top:"3%", left:"39%", fontFamily:"Arial, Helvetica, sans-serif", fontSize: "1.25vw", fontWeight: "bold", paddingTop:"15px"}}>
                    Create project
                </div>
                <div id="lblUserName" style={{textAlign:"left", display:"block", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1vw", fontWeight: "bold",paddingTop:"15px"}}>
                    <div id="dvUserName" style={{width:"300px"}}>Project Name:<span style={{color:"red"}}>*</span></div>
                </div>
                <div id="Div5" style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                    <input id="projectName" type="text" onChange={handleChange} onBlur={(event) => showNameMessage(event.target.value)} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '400px', backgroundColor: '#ffffff'}} />
                </div>
                <div style={{position:'absolute', zIndex:'999999', width:'350px', left:'33%', padding:'3px'}}
                    className={`alert alert-danger ${isNameValid ? 'alert-shown' : 'alert-hidden'}`}
                    onTransitionEnd={() => setIsNameValid(false)}
                    >
                    <strong>Error:</strong> Please Enter a Project Name
                </div> 
                <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1vw", fontWeight: "bold",paddingTop:"15px"}}>
                        Project Type <span style={{color:'red'}}>*</span>
                </div>
                <div style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                    <select id="projectType" className="selcls" style={{width:'150px', zIndex:'999999'}} onChange={handleChange}>
                        
                        {typeOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1vw", fontWeight: "bold",paddingTop:"15px"}}>
                Key <span style={{color:'red'}}>*</span>
            </div>
            <div id="Div5" style={{display:"block", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"2px"}}>
                    <input id="projectKey" type="text" onChange={handleChange} onBlur={(event) => {showKeyMessage(event.target.value)} } style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '80px', backgroundColor: '#ffffff'}} />
            </div>
            <div style={{position:'absolute', zIndex:'999999', width:'274px', left:"33%"}}
                className={`alert alert-danger ${isKeyValid ? 'alert-shown' : 'alert-hidden'}`}
                onTransitionEnd={() => setIsKeyValid(false)}
                >
                <strong>Error:</strong> Please Enter a Key 
            </div> 
            <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1vw", fontWeight: "bold",paddingTop:"15px"}}>
                Description
            </div>
            <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"5px"}}>
                <textarea id="projectDesc" onChange={handleChange} row="4" name="content" style={{width:'400px'}}></textarea>
            </div>
            <div style={{textAlign:"left", margin: "0 auto", position:"relative", top:"3%", left:"33%", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", fontWeight: "bold",paddingTop:"15px"}}>
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