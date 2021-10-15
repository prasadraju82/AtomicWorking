import axios from "axios";

const API_URL = "http://localhost:5000/api/projects/";

const getProjectList = (emailId) =>{
    console.log(emailId);
    return axios.get(API_URL + "projectlist/" + emailId).then((response) => {
        //console.log(response);
        return response});
}

const getAllProjects = () => {
    return axios.get(API_URL + "getallprojects").then((response) => {
        //console.log(response);
        return response});
}

const createproject = (project) => {
    return axios.post(API_URL + "createproject",project).then((response) => {
        return response
    })
}

const updateProject = (project) => {
    return axios.post(API_URL + "updateproject",project).then((response) => {
        return response
    })
}

const getProjectByKey = (projectKey) =>{
    console.log(projectKey);
    return axios.get(API_URL + "getprojectbykey/" + projectKey).then((response) => {
        //console.log(response);
        return response});
}

export default { getProjectList, getAllProjects, createproject, updateProject, getProjectByKey };