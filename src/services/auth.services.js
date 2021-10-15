import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = (user) => {
  return axios.post(API_URL + "signup", user);
};

const checkUser = (emailId) => {
    return axios.post(API_URL + "checkuser", emailId).then((response) => {
        console.log(response);
        return response.data});
}

const savePassword = (user) => {
  return axios.post(API_URL + "savepassword", user).then((response) => {
    console.log(response);
    return response}).catch((error) => {
      return error
    });
}

// const savePassword = async (user) => {
//   try {
//     const response = await axios.post(API_URL + "savepassword", user);
//     console.log(response);
//     return response;
//   } catch (error) {
//     return error;
//   }
// }

const login = (user) => {
  return axios.post(API_URL + "signin", user).then((response) => {
    // console.log('Outside: ' + response.data.accessToken);
    if (response.data.accessToken) {
      // console.log('Inside: ' + response.data.role);
      window.localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response}).catch((error) => {
      return error
    });
}

const getUsers = (username) => {
  return axios.get(API_URL + "getusers/" + username).then((response) => {
    // console.log('Outside: ' + response.data.accessToken);
    // if (response.data.accessToken) {
    //   // console.log('Inside: ' + response.data.role);
    //   window.localStorage.setItem("user", JSON.stringify(response.data));
    // }
    return response}).catch((error) => {
      return error
    });
}

export default { register, checkUser, savePassword, login, getUsers };