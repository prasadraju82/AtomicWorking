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

export default { addUser };