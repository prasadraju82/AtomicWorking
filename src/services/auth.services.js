import axios from "axios";
import API_URL_CONSTANT from "./apiconstants";

const API_URL = API_URL_CONSTANT + "api/auth/";

const register = (user) => {
  return axios.post(API_URL + "signup", user).then((response) => {
    console.log(response);
    return response});
};

const checkUser = (emailId) => {
  console.log(API_URL);
  console.log(API_URL_CONSTANT);
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

const logout = () => {
  localStorage.removeItem("user");
};

export default { register, checkUser, savePassword, login, getUsers, logout };