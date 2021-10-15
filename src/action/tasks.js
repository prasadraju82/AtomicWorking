import TaskService from "../services/tasks";

export const getTaskById =(taskId) => (dispatch) => {
    return TaskService.getTaskById(taskId).then(
    (response) => {
        console.log("action: " + response.data);
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