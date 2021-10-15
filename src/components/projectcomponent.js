import React, { useState, useEffect } from 'react';
import axios from "axios";
//import ProjectTable from './projectTable'

const API_URL = "http://localhost:5000/api/projects/";

function ProjectComponent(props){
    const [projectData, setProjectData] = useState([])
    console.log(props.emailId)
    useEffect(() => {
        axios.get(API_URL + "projectlist/" + props.emailId).then(res => {
            console.log(res);
            setProjectData(res.data);
        })
        // const fetchProjects = async () => {
        //     const response = await axios.get(API_URL + "projectlist/" + props.email).then(res =)
        //         setProjectData({project: response.data})
                
        // };
        // fetchProjects();
        console.log(projectData);
    },[props.emailId])

    //console.log(projectData);

    return(<div>
        {/* <ProjectTable project = {projectData.project} /> */}
        <div>
            HELLO
        </div>
        <ul>
        {
            // eslint-disable-next-line array-callback-return
            projectData.map(proj => {
                <li key={proj.projectName}>{proj.projectDesc} </li>
            })
        }
        </ul>
    </div>)
}

export default ProjectComponent;