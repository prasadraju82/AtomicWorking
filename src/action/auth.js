import AuthService from "../services/auth.services";

export const register = (user) => (dispatch) => {
  return AuthService.register(user).then(
    (response) => {
      dispatch({
        type: "REGISTER_SUCCESS",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: "REGISTER_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const checkUser = (emailId) => (dispatch) => {
    return AuthService.checkUser(emailId).then(
      (response) => {
        dispatch({
          type: "CHECK_SUCCESS",
          payload:{ response: response }
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: { response: response }
        });
        console.log(response)
        return Promise.resolve(response);
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        dispatch({
          type: "CHECK_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject(error);
      }
    );
  };

  export const savepassword = (user) => (dispatch) => {
    return AuthService.savePassword(user).then(
      (response) => {
        dispatch({
          type: "SAVE_SUCCESS",
          payload:{ response: response }
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: { response: response }
        });
        console.log(response)
        return Promise.resolve(response);
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        dispatch({
          type: "CHECK_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject(error);
      }
    );
  }

  export const login = (user) => (dispatch) => {
    return AuthService.login(user).then(
      (response) => {
        console.log("action: " + response.data);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload:{ user: response.data }
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: { response: response }
        });
        //console.log(response)
        return Promise.resolve(response);
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        dispatch({
          type: "LOGIN_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject(error);
      }
    );
  }