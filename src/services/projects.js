import axios from "axios";
import API_URL_CONSTANT from "./apiconstants";
import authHeader from "./auth-header";

const API_URL = API_URL_CONSTANT + "api/projects/";

const getProjectList = (emailId) =>{
    console.log(emailId);
    return axios.get(API_URL + "projectlist/" + emailId, {headers: authHeader()}).then((response) => {
        //console.log(response);
        return response});
}

const getAllProjects = () => {
    return axios.get(API_URL + "getallprojects", {headers: authHeader()}).then((response) => {
        //console.log(response);
        return response});
}

const createproject = (project) => {
    return axios.post(API_URL + "createproject",project, {headers: authHeader()}).then((response) => {
        return response
    })
}

const updateProject = (project) => {
    return axios.post(API_URL + "updateproject",project, {headers: authHeader()}).then((response) => {
        return response
    })
}

const getProjectByKey = (projectKey) =>{
    console.log(projectKey);
    return axios.get(API_URL + "getprojectbykey/" + projectKey, {headers: authHeader()}).then((response) => {
        //console.log(response);
        return response});
}

export default { getProjectList, getAllProjects, createproject, updateProject, getProjectByKey };