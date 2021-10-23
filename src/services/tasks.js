import axios from "axios";
import API_URL_CONSTANT from "./apiconstants";

const API_URL = API_URL_CONSTANT + "api/tasks/";
const API_URL_WORKLOG = API_URL_CONSTANT + "api/worklog/";

const getRecentTaskList = (assignedUserId) =>{
    console.log(assignedUserId);
    return axios.get(API_URL + "recenttaskslist/" + assignedUserId).then((response) => {
        //console.log(response);
        return response});
}

const getTaskById = (taskId) =>{
    console.log(taskId);
    return axios.get(API_URL + "gettaskbyid/" + taskId).then((response) => {
        console.log(response);
        return response});
}

const saveWorkLog = (worklog) => {
    return axios.post(API_URL_WORKLOG + "saveworklog", worklog).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const createTask = (task) => {
    return axios.post(API_URL + "createtask", task).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const updateTaskByTaskId = (task) => {
    return axios.post(API_URL + "updatetaskbytaskid", task).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("task", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const getAllTaskList = (assignedUserId) =>{
    console.log(assignedUserId);
    return axios.get(API_URL + "alltaskslist/" + assignedUserId).then((response) => {
        //console.log(response);
        return response});
}

const getTaskForKanbanBoard = (projectId, statusId) => {
    return axios.get(API_URL + "alltasksbyprojectid/" + projectId + "/" + statusId).then((response) => {
        //console.log(response);
        return response});
}

const updateTaskStatus = (task) => {
    return axios.post(API_URL + "updatetaskbytaskid", task).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("task", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const getWorkLogsByTaskId = (taskId) =>{
    return axios.get(API_URL_WORKLOG + "getworklogbytaskid/" + taskId).then((response) => {
        console.log(response);
        return response});
}

const getWorkLogById = (worklogid) =>{
    return axios.get(API_URL_WORKLOG + "getworklogbyid/" + worklogid).then((response) => {
        console.log(response);
        return response});
}

const updateWorkLog = async (worklog) => {
    try {
        const response = await axios.post(API_URL_WORKLOG + "updateworklog", worklog);
        return response;
    } catch (error) {
        return error;
    }
}

const deleteWorkLogById = (worklogId) =>{
    return axios.get(API_URL_WORKLOG + "deleteworklogbyid/" + worklogId).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("task", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const updateUserByTaskId = (user) => {
    return axios.post(API_URL + "updateuserbytaskid", user).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

const getUserByTaskId = (taskId) =>{
    return axios.get(API_URL + "getuserbytaskid/" + taskId).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("task", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

export default { getRecentTaskList, getTaskById, saveWorkLog, updateTaskByTaskId, createTask, getAllTaskList, getTaskForKanbanBoard, 
    updateTaskStatus, getWorkLogsByTaskId, getWorkLogById, updateWorkLog, deleteWorkLogById, updateUserByTaskId, getUserByTaskId };