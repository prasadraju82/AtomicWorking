import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "../../css/tasks.css";
import Navbar from '../../components/Navbar';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import ProjectsService from "../../services/projects";
import AuthService from "../../services/auth.services";
import { Input, Ul, Li, SuggestContainer } from './style';
import TaskService from "../../services/tasks";

function CreateTask(props){

    const { user: currentUser } = useSelector((state) => state.auth);
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("0")
    const [taskName, setTaskName] = useState("");
    const [taskType, setTaskType] = useState("0");
    const [taskPriority, setTaskPriority] = useState("1");
    const [taskDesc, setTaskDesc] = useState("");
    const [assignee, setAssignee] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");

    const [inputValue, setInputValue] = useState({name: ""});
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [suggestion, setSuggestion] = useState(true);

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

    // const searchWrapper = document.querySelector(".search-input");
    // const inputBox = searchWrapper.querySelector("input");
    // const suggBox = searchWrapper.querySelector(".autocom-box");
    // let linkTag = searchWrapper.querySelector("a");

    useEffect(() =>{
        getAllProjects();
    },[])

    if (!currentUser) {
        return <Redirect to="/login" />;
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

    const debounce = (fn, waitTime) =>{
        let timeoutID;
        return function(args){
            clearTimeout(timeoutID);
            const context = this;
            timeoutID = setTimeout(() => {
                fn.call(context, args)
            }, waitTime);
        };
    }
    
    const debounced = debounce(getSearch, 2000);
    
    function getSearch(inp){
        debugger;
        let resultArray = [];
        let userInput = inp
       
    }
    
    
    const selectElement = (usersname, userid) => {
       // document.getElementById("txtName").value = usersname;
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

    return(
        <div>
            <Navbar />
            <div className="flex-container">
                <div>
                    <div style={{width:'100%', marginLeft: '50px',  marginTop: '30px', fontFamily:'Arial'}}>
                        Project Name <span style={{color:'red'}}>*</span>
                    </div>
                    <div style={{width:'20%', marginLeft: '50px',  marginTop: '5px'}}>
                        <select id="Select1" className="selcls" style={{width:'220px'}} onChange={event => {setProjectId(event.target.value)}}>
                            <option key = '0' value='0'>-Select-</option>
                            {projects.map(project => (
                                <option key={project._id} value={project._id}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div style={{width:'100%', marginLeft: '50px',  marginTop: '30px', fontFamily:'Arial'}}>
                        Task Type <span style={{color:'red'}}>*</span>
                    </div>
                    <div style={{width:'20%', marginLeft: '50px',  marginTop: '5px'}}>
                        <select id="Select2" className="selcls" onChange={event => {setTaskType(event.target.value)}}>
                        {typeOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                        </select>
                    </div>
                </div>
                    <div>
                        <div style={{width:'100%', marginLeft: '50px',  marginTop: '30px', fontFamily:'Arial'}}>
                            Priority
                        </div>
                        <div style={{width:'20%', marginLeft: '50px',  marginTop: '5px'}}>
                            <select id="Select3" className="selcls" onChange={event => {setTaskPriority(event.target.value)}}>
                                {priorityOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <hr />
                <div style={{width:'20%', marginLeft: '50px',  marginTop: '15px', fontFamily:'Arial'}}>
                    Summary <span style={{color:'red'}}>*</span>
                </div>
                <div style={{width:'80%', marginLeft: '50px',  marginTop: '5px'}}>
                    <input type="text" onChange={event => {setTaskName(event.target.value)}} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '940px', backgroundColor: '#ffffff'}} />
                </div>
                <div style={{width:'20%', marginLeft: '50px',  marginTop: '15px', fontFamily:'Arial'}}>
                    Description 
                </div>
                <div style={{width:'91%', marginLeft: '50px',  marginTop: '5px', fontFamily:'Arial'}}>
                    <textarea onChange={event => {setTaskDesc(event.target.value)}} row="4" name="content" id ="editor"></textarea>
                </div>
                <div className="flex-container">
                    <div>
                        <div style={{width:'100%', marginLeft: '50px',  marginTop: '15px', fontFamily:'Arial'}}>
                            Assignee <span style={{color:'red'}}>*</span>
                        </div>
                        <div style={{width:'80%', marginLeft: '50px',  marginTop: '5px'}}>
                            {/* <input type="text" onChange={event => {getUsers(event.target.value)}} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '450px', backgroundColor: '#ffffff'}}  /> */}
                            {/* <div className="autocom-box">
                                <ul>
                                    {
                                        users.length > 0 && users.map((value, index) => {
                                          return  `<li>${value.name}</li>`
                                        })
                                    }
                                </ul>
                            </div> */}
                            {/* <div className="wrapper">
                                <div className="search-input"> */}
                                    
                                    <input id="txtName" value={userName} type="text" onChange={event => {getUsers(event.target.value)}} placeholder="Type to search.." />
                                    {/* <div class="autocom-box"> */}
                                   { suggestion && <SuggestContainer>
                                            <Ul>
                                                {/* {loading && <Li>Loading...</Li>} */}
                                                {users && users.length > 0 &&
                                                    // !loading &&
                                                    users.map((value, index) => (
                                                        <Li
                                                            key={`${value._id}-${index}`}
                                                             onClick={() => selectElement(value.name, value._id)}
                                                        >
                                                            {value.name}
                                                        </Li>
                                                    ))}
                                            </Ul>
                                        </SuggestContainer> }
                                    {/* </div> */}
                                    
                                {/* </div>
                            </div> */}
                            
                        </div>
                    </div>
                    <div>
                        <div style={{width:'100%', marginLeft: '50px', marginTop: '15px', marginBottom: '5px'}}>
                            Estimated Time <span style={{color:'red'}}>*</span>
                        </div>
                        <div style={{width:'100%', marginLeft: '50px', marginTop: '0px'}}>
                            <input type="text" onChange={event => {setEstimatedTime(event.target.value)}} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '150px', backgroundColor: '#ffffff'}}  /><span>  (eg. 2h 40m)</span>
                        </div>
                    </div>
                </div>
                <div style={{width:'940px', marginLeft: '50px',  marginTop: '5px', justifyContent: 'right', textAlign:'right'}}>
                    {/* <button style="background-color:blue; height: 30px;  width: 80px; border-radius:5px; font-weight: bold; color:white; font-size:16px;" onclick="return go()">Save</button> */}
                    <div><button className="btn btn-primary" id="btnAssignee" onClick={() => createTask()}>Save</button></div>
                </div>
        </div>
    )
}

export default CreateTask;