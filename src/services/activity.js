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

export default { saveActivity };