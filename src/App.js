import './App.css';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import ProjectList from './pages/projects/projectlist';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './components/PrivateRoute';
import RecentTasks from './pages/tasks/recenttasks';
import TaskDetails from './pages/tasks/taskdetails/taskdetails-master';
import CreateTask from './pages/tasks/createtask';
import CreateProject from './pages/projects/createproject';
import AddUser from './pages/users/adduser';
import UserList from './pages/users/userlist';
import AllTask from './pages/tasks/alltasks';
import KanbanBoard from './components/boards/kanban-board';
import ConfirmEmail from './pages/users/confirmemail';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component ={Login} />
        <Route exact path='/signUp' component ={SignUp} />
        {/* <Route exact path='/projectlist/:emailId' component ={ProjectList} />  */}
        <PrivateRoute exact path="/projectlist" component={ProjectList} />
        <PrivateRoute exact path="/recenttasks" component={RecentTasks} />
        <PrivateRoute exact path="/taskdetails/taskdetails-master/:taskId" component={TaskDetails} />
        <PrivateRoute exact path="/createtask" component={CreateTask} />
        <PrivateRoute exact path="/createproject" component={CreateProject} />
        <PrivateRoute exact path="/adduser" component={AddUser} />
        <PrivateRoute exact path="/userlist" component={UserList} />
        <PrivateRoute exact path="/alltasks" component={AllTask} />
        <Route exact path='/kanbanboard' component ={KanbanBoard} />
        <Route exact path='/confirmemail/:emailId' component ={ConfirmEmail} />
        <Route component={Error} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;