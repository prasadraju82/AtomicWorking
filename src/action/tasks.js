import TaskService from "../services/tasks";

export const getTaskById = (taskId) => (dispatch) => {
    return TaskService.getTaskById(taskId).then(
    (response) => {

        dispatch({type: "FETCH_TASK",
            payload: {task: response.data} 
        });

        return Promise.resolve(response);
    },
    (error) => {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: "FETCH_TASK_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    });

    
}

export const assignTaskUser = (userPayLoad) => (dispatch) =>{
  return TaskService.updateUserByTaskId(userPayLoad).then(
    (response) => {

      dispatch({type: "ASSIGN_USER_TO_TASK",
          payload: {task: response.data.data} 
      });

      return Promise.resolve(response);
  },
  (error) => {
  const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    dispatch({
      type: "ASSIGN_USER_TO_TASK_FAIL",
    });

    dispatch({
      type: "SET_MESSAGE",
      payload: message,
    });

    return Promise.reject();
  });
   
}