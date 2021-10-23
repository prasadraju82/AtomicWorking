import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Navigation from '../../components/Navigation';
import "../../css/projects.css";
import axios from "axios";
import EditProjectModal from './editproject';
import ProjectServices from "../../services/projects";

const API_URL = "http://localhost:5000/api/projects/";

function ProjectList(){
    const { user: currentUser } = useSelector((state) => state.auth);
    const [projectData, setProjectData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);
    const [projectEditModalShow, setProjectEditModalShow] = React.useState(false);
    const [projectKey, setProjectKey] = useState("");
    const userEmail = currentUser.email;
    const role = currentUser.role;
    console.log(role);
    useEffect(() => {
        if (!currentUser) {
            return <Redirect to="/login" />;
        }
        // axios.get(API_URL + "projectlist/" + userEmail).then(res => {
        //     console.log(res);
        //     setProjectData(res.data);
        // })

        getAllProject(userEmail);
    },[])

    useEffect(() => {
        if(currentUser.role === 1){
            setIsAdmin(true);
        }
        else{
            setIsAdmin(false);
        }
    }, [currentUser])

    const openEdit = (isModal, key) => {
        setProjectEditModalShow(isModal);
        setProjectKey(key);
    }

    const getAllProject = (email) => {
        ProjectServices.getProjectList(email).then(res => {
            console.log(res);
            setProjectData(res.data);
        })
    }
    
    return(<div>
                <Navigation isProj = {true} isUser = {false} isTask = {false} />
                <div style={{textAlign:'right', marginRight:'200px'}}>
                   { isAdmin && <button type="button" className="btn btn-primary">CREATE PROJECT</button> } 
                </div>
                <div>
                    Project List
                </div>
                <div>
                       
                    <div>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Project Name</th>
                                            <th scope="col">Key</th>
                                            <th scope="col">Lead</th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            projectData.map((proj,index) => {
                                                return(
                                                    <tr>
                                                        <td></td>
                                                        <td>{proj.projectName}</td>
                                                        <td>{proj.projectKey}</td>
                                                        <td>{proj.creator}</td>
                                                        <td>
                                                            <button type="button" onClick ={() => openEdit(true, proj.projectKey)} className="btn btn-primary">Edit</button>
                                                        </td>
                                                    </tr>
                                                    
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <EditProjectModal  show = {projectEditModalShow} onHide={() => setProjectEditModalShow(false)} projKey = {projectKey}/>
        </div>)
}

export default ProjectList;