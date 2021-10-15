import './App.css';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import ProjectList from './pages/projects/projectlist';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './components/PrivateRoute';
import RecentTasks from './pages/tasks/recenttasks';
import TaskDetails from './pages/tasks/taskdetails/taskdetails-master';
import CreateTask from './pages/tasks/createtask';
import CreateProject from './pages/projects/createproject';
import AddUser from './pages/users/adduser';
import UserList from './pages/users/userlist';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component ={Login} />
        <Route exact path='/signUp' component ={SignUp} />
        {/* <Route exact path='/projectlist/:emailId' component ={ProjectList} />  */}
        <PrivateRoute exact path="/projectlist/:emailId" component={ProjectList} />
        <PrivateRoute exact path="/recenttasks" component={RecentTasks} />
        <PrivateRoute exact path="/taskdetails/taskdetails-master" component={TaskDetails} />
        <PrivateRoute exact path="/createtask" component={CreateTask} />
        <PrivateRoute exact path="/createproject" component={CreateProject} />
        <PrivateRoute exact path="/adduser" component={AddUser} />
        <PrivateRoute exact path="/userlist" component={UserList} />
        <Route component={Error} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;