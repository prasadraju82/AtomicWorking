import axios from "axios";
import API_URL_CONSTANT from "./apiconstants";
import authHeader from "./auth-header";

const API_URL = API_URL_CONSTANT + "api/users/";

const addUser = (user) =>{
    return axios.post(API_URL + "adduser", user, {headers: authHeader()}).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const getAllUsers = () => {
    return axios.get(API_URL + "getallusers/", {headers: authHeader()}).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

const getUserById = (emailid) => {
    return axios.get(API_URL + "getuserbyid/" + emailid, {headers: authHeader()}).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

const upadteUser = (user) =>{
    return axios.post(API_URL + "updateuser", user, {headers: authHeader()}).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

const deleteUserById = (emailid) => {
    console.log(emailid);
    return axios.get(API_URL + "deleteuserbyid/" + emailid, {headers: authHeader()}).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

const activateUser = (user) => {
    return axios.post(API_URL + "activateuser", user, {headers: authHeader()}).then((response) => {
        
    return response}).catch((error) => {
        return error
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { addUser, getAllUsers, getUserById, upadteUser, deleteUserById, activateUser };