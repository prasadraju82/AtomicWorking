import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks/";
const API_URL_WORKLOG = "http://localhost:5000/api/worklog/";

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

export default { getRecentTaskList, getTaskById, saveWorkLog, updateTaskByTaskId, createTask };