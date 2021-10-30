import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import tasks from "./tasks";
import worklog from "./worklog";

export default combineReducers({
  auth,
  message,
  tasks,
  worklog
});