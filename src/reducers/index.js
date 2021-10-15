import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import tasks from "./tasks";

export default combineReducers({
  auth,
  message,
  tasks
});