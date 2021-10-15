import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import TasksService from "../../services/tasks";
import "../../css/tasks.css";
import taskImage from '../../images/task.JPG'

function RecentTasks(){
    const { user: currentUser } = useSelector((state) => state.auth);
    const [taskData, setTaskData] = useState([]);
   
    useEffect(() => {
        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        if(currentUser !== undefined){
            TasksService.getRecentTaskList(currentUser.id).then(
                (response) => {
                    setTaskData(response.data)
                }
            )
        }
    },[])

    let history = useHistory();

    const gotoTaskDetails = (taskId) => {
        history.push('/taskdetails/taskdetails-master', { taskid: taskId });
    }
    console.log(currentUser);
    return(<div>
            <div>
                <Navbar/>
            </div>
            <div>
                <div className="flex-container" style={{width:'80%', marginTop: '50px', marginLeft: '100px'}}>
                    <div style={{width:'500px', textAlign:'right', paddingLeft:'5px'}}>
                        <input class="form-control mr-sm-2" type="text" placeholder="Search" style={{width:'60%'}} />
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', letterSpacing: 'normal'}}>
                        Recent Tasks
                    </div>
                    <br />
                </div>                   
            </div>
            <div>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Task</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        taskData.map((task,index) => {
                                            return(
                                                <tr>
                                                    <td style={{width:'5%'}}>
                                                        <div style={{marginRight:'0px'}}><img src={taskImage} width="35" height="35" alt="task"></img></div>
                                                    </td>
                                                    <td>
                                                        <div className="flex-container">
                                                            <div style={{height:'25px'}}><a onClick={() => gotoTaskDetails(task.taskId)} style={{fontSize: 'large', fontWeight: 'bold', textDecoration:'none', color:'blue'}}>{task.taskName}</a></div>
                                                        </div>
                                                        <div className="flex-container">
                                                            <div style={{marginLeft:'0px',color:'#546E7A', fontWeight:'lighter', width:'12%;'}}>{task.taskId}</div><div style={{marginLeft:'30px',color:'#546E7A', fontWeight:'lighter'}}>{task.projectName}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 'medium', textAlign: 'left', display: 'block', verticalAlign: 'middle', color:'#546E7A'}}>{task.statusId}</div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{position:'relative', textAlign:'center', verticalAlign:'middle', width:'100%'}}>
                <div>
                    <a href="AllTasks.aspx" style={{backgroundColor: '#f8f9fa!important', color:'mediumpurple'}}>Views all tasks</a>  
                </div>
            </div>
    </div>)
}

export default RecentTasks;