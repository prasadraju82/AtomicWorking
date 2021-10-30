import React, { useState, useEffect } from 'react';
import "../../css/tasks.css";
import Navigation from '../../components/Navigation';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import ProjectsService from "../../services/projects";
import AuthService from "../../services/auth.services";
import { Ul, Li, SuggestContainerTask } from './style';
import TaskService from "../../services/tasks";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import { Container } from 'react-bootstrap';

function CreateTask(props){

    const { user: currentUser } = useSelector((state) => state.auth);
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("0")
    const [taskName, setTaskName] = useState("");
    const [taskType, setTaskType] = useState("0");
    const [taskPriority, setTaskPriority] = useState("1");
    const [taskDesc, setTaskDesc] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");

    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [suggestion, setSuggestion] = useState(true);

    const[isAddButtonDisabled, setAddButton] = useState(true);
    const[isTaskNameValid, setIsTaskNameValid] = useState(false);
    const[isAssigneeValid, setIsAssigneeValid] = useState(false);
    const[isEstimatedTimeValid, setEstimatedTimeValid] = useState(false);

    const typeOptions = [
        {
            label: "--Select--",
            value: "0",
        },
        {
          label: "Enhancement",
          value: "1",
        },
        {
          label: "Feature",
          value: "2",
        },
        {
          label: "Bug",
          value: "3",
        },
        {
          label: "Investigate",
          value: "4",
        },
        {
          label: "Change",
          value: "5",
        }
    ];

    const priorityOptions = [
        {
          label: "Normal",
          value: "1",
        },
        {
          label: "High",
          value: "2",
        },
        {
          label: "Low",
          value: "3",
        },
        {
          label: "Urgent",
          value: "4",
        }
    ];

    useEffect(() => {
        if(taskName !== "" && taskType !== "0" && taskType !== '' 
        && projectId !== "" && projectId !== "0" && userName !== "" && estimatedTime !== ""
        && (/^(?=.*[hmd]$)\d+(?:d\s*)?\d*(?:h\s*)?\d*(?:m\s*)?$/.test(estimatedTime)) ){
            setAddButton(false);
        }
        else{
            setAddButton(true);
        }
    },[taskName, taskType, projectId, userName, estimatedTime])

    useEffect(() =>{
        getAllProjects();
    },[])

    if (!currentUser) {
        return <Redirect to="/" />;
    }

    const getAllProjects = () => {
        ProjectsService.getAllProjects().then(response =>
        {
            setProjects(response.data);
        })
    }

    const getUsers = (username) => {
        setUserName(username);

        AuthService.getUsers(username).then(response =>
        {
            console.log(username)
            console.log(response)
            setUsers(response.data);
            setSuggestion(true);
           
        })
        
    }
        
    const selectElement = (usersname, userid) => {
        setUserName(usersname);
        setUserId(userid);
        setSuggestion(false);
    }

    const createTask = () =>{

        const taskPayLoad ={
            taskName:taskName,
            taskDesc: taskDesc,
            estimatedTime: estimatedTime,
            taskTypeId: taskType,
            projectId: projectId,
            assignedUserId: userId,
            creatorUserId: currentUser._id,
            priorityId: taskPriority
        }

        TaskService.createTask(taskPayLoad).then((response) => {
            
            if(response.data.message === "Success"){
               alert("Task Saved Successfully");
            }
        }).catch((error) => {console.log(error)})
    }

    const showTaskNameMessage = (val) => {
        if(val !== ""){
            setIsTaskNameValid(false)
        }
        else{
            setIsTaskNameValid(true)
        }
    }

    const showAssigneeMessage = (val) => {
        if(val !== ""){
            setIsAssigneeValid(false)
        }
        else{
            setIsAssigneeValid(true)
        }
    }

    const showEstimatedTimeMessage = (val) => {
        if(val !== ""){
            setEstimatedTimeValid(false)
        }
        else{
            setEstimatedTimeValid(true)
        }
    }

    const getCKEditor = (event, editor) => {
        setTaskDesc(editor.getData())
    }

    return(
        <div>
            
            <Navigation isProj = {false} isUser = {false} isTask = {true} />
            
            <Container fluid>

            
            <div className="row">
                <div className="col-sm-12">
                    <div style={{margin: "0 auto", position:"relative", top:"6%", textAlign: "center", fontFamily:"Arial, Helvetica, sans-serif", fontSize: "1.25vw", fontWeight: "bold", paddingTop:"15px"}}>
                        Create Task
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">

                </div>
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col-sm-4">
                            <div style={{width:'100%', marginTop: '30px', fontFamily:'Arial'}}>
                                Project Name <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'20%', marginTop: '5px'}}>
                                <select id="Select1" className="selcls" onChange={event => {setProjectId(event.target.value)}}>
                                    <option key = '0' value='0'>-Select-</option>
                                    {projects.map(project => (
                                        <option key={project._id} value={project._id}>
                                            {project.projectName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div style={{width:'100%', marginTop: '30px', fontFamily:'Arial'}}>
                                Task Type <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'20%', marginTop: '5px'}}>
                                <select id="Select2" className="selcls" onChange={event => {setTaskType(event.target.value)}}>
                                {typeOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                                </select>
                            </div>                
                        </div>
                        <div className="col-sm-4">
                            <div style={{width:'100%', marginTop: '30px', fontFamily:'Arial'}}>
                                Priority
                            </div>
                            <div style={{width:'20%', marginTop: '5px'}}>
                                <select id="Select3" className="selcls" onChange={event => {setTaskPriority(event.target.value)}}>
                                    {priorityOptions.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div className="col-sm-2">

                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">

                </div>
                <div className="col-sm-8">
                    <div style={{width:'20%', marginTop: '35px', fontFamily:'Arial'}}>
                        Summary <span style={{color:'red'}}>*</span>
                    </div>
                    <div style={{ marginTop: '5px'}}>
                        <input type="text" onChange={event => {setTaskName(event.target.value)}} onBlur={(event) => { showTaskNameMessage(event.target.value) }} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '100%', backgroundColor: '#ffffff'}} />
                    </div>
                    <div style={{position:'absolute', zIndex:'999999', width:'274px' }}
                        className={`alert alert-danger ${isTaskNameValid ? 'alert-shown' : 'alert-hidden'}`}
                        onTransitionEnd={() => setIsTaskNameValid(false)}
                    >
                        <strong>Error:</strong> Please Enter Task Summary
                    </div> 
                </div>
                <div className="col-sm-2">

                </div>                       
            </div>
            <div className="row">
                <div className="col-sm-2">

                </div>
                <div className="col-sm-8">
                    <div style={{width:'20%', marginTop: '35px', fontFamily:'Arial'}}>
                        Description 
                    </div>
                    <div style={{ marginTop: '5px', fontFamily:'Arial'}}>
                        <CKEditor
                                editor={ClassicEditor}
                                onInit = {editor =>{
                                
                                }}
                                // data={userComment}
                            //   config={editorConfig}
                                onChange={(event, editor) => getCKEditor(event, editor)}
                            >
                                    
                        </CKEditor>
                    </div>                   
                </div>
                <div className="col-sm-2">

                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">

                </div>
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col-sm-6">
                            <div>
                                <div style={{width:'100%', marginTop: '35px', fontFamily:'Arial'}}>
                                    Assignee <span style={{color:'red'}}>*</span>
                                </div>
                                <div style={{width:'80%', marginTop: '5px'}}>
                                    
                                    <input id="txtName" value={userName} type="text" onChange={event => {getUsers(event.target.value)}} onBlur ={event => showAssigneeMessage(event.target.value)} placeholder="Type to search.." />
                                    
                                    { suggestion && <SuggestContainerTask>
                                            <Ul>
                                                {users && users.length > 0 &&
                                                    users.map((value, index) => (
                                                        <Li
                                                            key={`${value._id}-${index}`}
                                                                onClick={() => selectElement(value.name, value._id)}
                                                        >
                                                            {value.name}
                                                        </Li>
                                                    ))}
                                            </Ul>
                                    </SuggestContainerTask> }
                                </div>
                            </div>
                            <div style={{position:'absolute', width:'274px'}}
                                className={`alert alert-danger ${isAssigneeValid ? 'alert-shown' : 'alert-hidden'}`}
                                onTransitionEnd={() => setIsAssigneeValid(false)}
                                >
                                <strong>Error:</strong> Please Select an Assignee
                            </div> 
                        </div>
                        <div className="col-sm-6">
                            <div>
                                <div style={{width:'100%', marginTop: '35px', marginBottom: '5px'}}>
                                    Estimated Time <span style={{color:'red'}}>*</span>
                                </div>
                                <div style={{width:'100%', marginTop: '0px'}}>
                                    <input type="text" onChange={event => {setEstimatedTime(event.target.value)}} onBlur={(event) => { showEstimatedTimeMessage(event.target.value) }} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '150px', backgroundColor: '#ffffff'}}  /><span>  (eg. 2h 40m)</span>
                                </div>
                                <div style={{position:'absolute', zIndex:'999999', width:'290px'}}
                                    className={`alert alert-danger ${isEstimatedTimeValid ? 'alert-shown' : 'alert-hidden'}`}
                                    onTransitionEnd={() => setEstimatedTimeValid(false)}
                                    >
                                    <strong>Error:</strong> Please Enter Estimated Time
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
                <div className="col-sm-2">

                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">

                </div>
                <div className="col-sm-8">
                    <div style={{marginTop: '5px', justifyContent: 'right', textAlign:'right'}}>
                        <div>
                            <button className="btn btn-primary" id="btnAssignee" disabled={isAddButtonDisabled} onClick={() => createTask()}>Save</button>
                        </div>
                    </div>                                    
                </div>
                <div className="col-sm-2">

                </div>
            </div>
            </Container>
        </div>
    )
}

export default CreateTask;