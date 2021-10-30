import worklog from "../reducers/worklog";
import TasksService from "../services/tasks";

export const getWorkLogByTaskId = (taskid) => (dispatch) => {
    return TasksService.getWorkLogsByTaskId(taskid).then(res => {
        dispatch({
            type: "FETCH_WORKLOG",
            payload: {worklogs : res.data}
        })
        console.log('task id:' + taskid)
        console.log(res.data);
        return Promise.resolve(res);
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();


      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject(error);
    })
}

export const addWorkLog = (worklogPayLoad) => (dispatch) => {
    return TasksService.saveWorkLog(worklogPayLoad).then(res => {
        dispatch({
            type: "ADD_WORKLOG",
            payload: {worklogs : res.data}
        })
        console.log(res.data);
        return Promise.resolve(res);
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject(error);
    })
}