import axios from "axios";
import API_URL_CONSTANT from "./apiconstants";
import authHeader from "./auth-header";

const API_URL = API_URL_CONSTANT + "api/tasks/";
const API_URL_WORKLOG = API_URL_CONSTANT + "api/worklog/";

const getRecentTaskList = (assignedUserId) =>{
    console.log(assignedUserId);
    return axios.get(API_URL + "recenttaskslist/" + assignedUserId, {headers: authHeader()}).then((response) => {
        //console.log(response);
        return response});
}

const getTaskById = (taskId) =>{
    console.log(taskId);
    return axios.get(API_URL + "gettaskbyid/" + taskId, {headers: authHeader()}).then((response) => {
        console.log(response);
        return response});
}

const saveWorkLog = (worklog) => {
    return axios.post(API_URL_WORKLOG + "saveworklog", worklog, {headers: authHeader()}).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

const createTask = (task) => {
    return axios.post(API_URL + "createtask", task, {headers: authHeader()}).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

const updateTaskByTaskId = (task) => {
    return axios.post(API_URL + "updatetaskbytaskid", task, {headers: authHeader()}).then((response) => {
       
    return response}).catch((error) => {
        return error
    });
}

const getAllTaskList = (assignedUserId) =>{
    console.log(assignedUserId);
    return axios.get(API_URL + "alltaskslist/" + assignedUserId, {headers: authHeader()}).then((response) => {
        
        return response});
}

const getTaskForKanbanBoard = (projectId, statusId) => {
    return axios.get(API_URL + "alltasksbyprojectid/" + projectId + "/" + statusId, {headers: authHeader()}).then((response) => {
    
        return response});
}

const updateTaskStatus = (task) => {
    return axios.post(API_URL + "updatetaskbytaskid", task, {headers: authHeader()}).then((response) => {
       
    return response}).catch((error) => {
        return error
    });
}

const getWorkLogsByTaskId = (taskId) =>{
    return axios.get(API_URL_WORKLOG + "getworklogbytaskid/" + taskId, {headers: authHeader()}).then((response) => {
        console.log(response);
        return response});
}

const getWorkLogById = (worklogid) =>{
    return axios.get(API_URL_WORKLOG + "getworklogbyid/" + worklogid, {headers: authHeader()}).then((response) => {
        console.log(response);
        return response});
}

const updateWorkLog = async (worklog) => {
    try {
        const response = await axios.post(API_URL_WORKLOG + "updateworklog", worklog, {headers: authHeader()});
        return response;
    } catch (error) {
        return error;
    }
}

const deleteWorkLogById = (worklogId) =>{
    return axios.get(API_URL_WORKLOG + "deleteworklogbyid/" + worklogId, {headers: authHeader()}).then((response) => {
       
    return response}).catch((error) => {
        return error
    });
}

const updateUserByTaskId = (user) => {
    return axios.post(API_URL + "updateuserbytaskid", user, {headers: authHeader()}).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

const getUserByTaskId = (taskId) =>{
    return axios.get(API_URL + "getuserbytaskid/" + taskId, {headers: authHeader()}).then((response) => {
       
    return response}).catch((error) => {
        return error
    });
}

const updateTaskFromKanbanBoard = (task) => {
    return axios.post(API_URL + "updatetaskfromkanbanboard", task, {headers: authHeader()}).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

export default { getRecentTaskList, getTaskById, saveWorkLog, updateTaskByTaskId, createTask, getAllTaskList, getTaskForKanbanBoard, 
    updateTaskStatus, getWorkLogsByTaskId, getWorkLogById, updateWorkLog, deleteWorkLogById, updateUserByTaskId, getUserByTaskId, updateTaskFromKanbanBoard };