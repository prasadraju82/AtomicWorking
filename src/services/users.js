import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

const addUser = (user) =>{
    return axios.post(API_URL + "adduser", user).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const getAllUsers = () => {
    return axios.get(API_URL + "getallusers/").then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const getUserById = (emailid) => {
    return axios.get(API_URL + "getuserbyid/" + emailid).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const upadteUser = (user) =>{
    return axios.post(API_URL + "updateuser", user).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const deleteUserById = (emailid) => {
    console.log(emailid);
    return axios.get(API_URL + "deleteuserbyid/" + emailid).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { addUser, getAllUsers, getUserById, upadteUser, deleteUserById };