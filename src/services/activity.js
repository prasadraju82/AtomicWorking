import axios from "axios";

const API_URL = "http://localhost:5000/api/activity/";

const saveActivity = (activity) =>{
    return axios.post(API_URL + "saveactivity", activity).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const getCommentById = (commentId) => {
    return axios.get(API_URL + "getactivitybyid/"+ commentId).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const updateActivityById = (useractivity) =>{
    return axios.post(API_URL + "updateactivitybyid", useractivity).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("task", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const deleteActivityById = (activityId) =>{
    return axios.get(API_URL + "deleteactivitybyid/" + activityId).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("task", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

export default { saveActivity, getCommentById, updateActivityById, deleteActivityById };