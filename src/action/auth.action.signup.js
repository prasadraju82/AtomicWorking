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