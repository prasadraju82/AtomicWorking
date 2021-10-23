import React, { useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
//import Button from 'react-bootstrap/button'
import ProjectServices from "../../services/projects";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import AuthService from "../../services/auth.services";
import { Ul, Li, SuggestContainer } from '../tasks/style';

function EditProjectModal(props){

    const { user: currentUser } = useSelector((state) => state.auth);

    const [project, setProject] = useState({
        projectName: "",
        projectType: "",
        projectKey: "",
        projectDesc: ""
    });

    const [leader, setLeader] = useState("");
    const [users, setUsers] = useState([]);
    const [suggestion, setSuggestion] = useState(true);
    const [leaderId, setLeaderId] = useState("");

    useEffect(() => {
        ProjectServices.getProjectByKey(props.projKey).then((response) => {
            console.log(response)
            const proj = {
                projectName: response.data.projectName,
                projectType: response.data.projectType,
                projectKey: response.data.projectKey,
                projectDesc: response.data.projectDesc
            }
            console.log(proj);
            setProject(proj);
            setLeader(response.data.userId.name)
        })
    },[props.projKey])

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

    const updateProject = () =>{
        const projectPayLoads = {
            projectName: project.projectName,
            projectType: project.projectType,
            projectKey: project.projectKey,
            projectDesc: project.projectDesc,
            userId: leaderId
        }
        console.log(projectPayLoads);
        console.log(currentUser);
        ProjectServices.updateProject(projectPayLoads).then((response) => {
            if(response.data.message === "Success"){
               alert("Project Updated Successfully");
            }
        }).catch((error) => {console.log(error)})
    }

    // const debounce = (fn, waitTime) =>{
    //     let timeoutID;
    //     return function(args){
    //         clearTimeout(timeoutID);
    //         const context = this;
    //         timeoutID = setTimeout(() => {
    //             fn.call(context, args)
    //         }, waitTime);
    //     };
    // }
    
    // const debounced = debounce(getSearch, 2000);
    
    // function getSearch(inp){
    //     debugger;
    //     let resultArray = [];
    //     let userInput = inp
    //     getUsers(userInput).then(t => {
            
    //         resultArray = t;
    //         resultArray = resultArray.map((data)=>{
    //             return data = `<li>${data}</li>`;
    //         });
    
           
    //         return t;
    //     });
    // }
    
   
    
    const selectElement = (usersname, userid) => {
        //console.log(user);
        document.getElementById("leader").value = usersname;
        setLeaderId(userid);
        setLeader(usersname);
        setSuggestion(false);
    }

    const getUsers = (username) => {

        console.log(username);
        AuthService.getUsers(username).then(response =>
        {
            console.log(username)
            console.log(response)
            setUsers(response.data);
            setSuggestion(true);
        })
    }

//     const getActualUser = (e) =>{
//         let userInput = e.target.value;
// //    console.log(userInput);
    
//         debounced.call(getSearch, userInput);
//     }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4 class="modal-title">Edit Project</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="modal-body">
                    <div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Key <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                               <span style={{fontFamily:'Arial'}}> {props.projKey} </span>
                            </div>
                        </div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Project Name <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                                <input id="projectName" type="text" value={project.projectName} onChange={handleChange} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '400px', backgroundColor: '#ffffff'}} />
                            </div>
                        </div>    
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Project Type <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                                <select id="projectType" className="selcls" style={{width:'150px'}} value={project.projectType} onChange={handleChange}>
                                    
                                    {typeOptions.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Leader <span style={{color:'red'}}>*</span>
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                                <input id="leader" type="text" value={leader}  onChange={event => {getUsers(event.target.value)}} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '400px', backgroundColor: '#ffffff'}} />
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
                            </div>
                        </div> 
                        <div className="flex-container">
                            <div style={{width:'35%', marginLeft: '0px',  marginTop: '30px', fontFamily:'Arial', textAlign:'right'}}>
                                Description
                            </div>
                            <div style={{width:'65%', marginLeft: '20px',  marginTop: '25px'}}>
                                <textarea id="projectDesc" value={project.projectDesc} onChange={handleChange} row="4" name="content" style={{width:'400px'}}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                    <Button onClick={() => updateProject()}>Save</Button><Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default EditProjectModal;