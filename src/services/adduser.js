import axios from "axios";
import API_URL_CONSTANT from "./apiconstants";

const API_URL = API_URL_CONSTANT + "api/users/";

const addUser = (user) =>{
    return axios.post(API_URL + "adduser", user).then((response) => {
        // if (response.data.accessToken) {
        //   window.localStorage.setItem("user", JSON.stringify(response.data));
        // }
    return response}).catch((error) => {
        return error
    });
}

export default { addUser };