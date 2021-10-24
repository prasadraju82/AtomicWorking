import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Navigation from '../../../components/Navigation';
import TasksService from "../../../services/tasks";
import "../../../css/tasks.css";
import TaskDetailsSummary from './taskdetails-summary';
import TaskDetailsComment from './taskdetails-comments';
import TaskDetailsTimeline from './taskdetails-timeline';
import TaskWorkLog from './task-worklog';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
// import { getTaskById } from "../../../action/tasks";
// import { useDispatch, useSelector } from "react-redux";

function TaskDetails(){
    let history = useHistory();
    const {state} = history.location;
    console.log("taskId: " + state.taskid);
    const [taskdetails, setTaskDetails] = useState([]);
    //const { task: currentTask } = useSelector((state) => state.task);
    //const dispatch = useDispatch();
    
    // dispatch(getTaskById({taskId: state.taskid}).then(
    //     function(response){
    //         setTaskDetails(response);
    //     }
    // ))

    useEffect(() => {
        getTaskByIdinMaster();
    },[])

    const getTaskByIdinMaster = () => {
        console.log("masterpage: " + state.taskid);
        //dispatch(getTaskById(state.taskid))
        TasksService.getTaskById(state.taskid).then(response => {
            console.log("master page: " + response.data);
            setTaskDetails(response.data);
        })
    }

   // console.log("master page state: " + currentTask);
    return(<div>
            <Navigation isProj = {false} isUser = {false} isTask = {true} />
            <div class="row">
                <div class="col-sm-8">
                    <div style={{marginLeft: '50px', marginTop:25}}>
                        <TaskDetailsSummary taskObject = {taskdetails} taskId = {state.taskid} />
                    </div>
                    <div style={{marginLeft: '50px'}}>
                        <Tabs defaultActiveKey="comment" id="uncontrolled-tab-example" className="mb-2">
                            <Tab eventKey="comment" title="Comment">
                                <TaskDetailsComment taskObject = {taskdetails} />
                            </Tab>
                            <Tab eventKey="worklog" title="Work Log">
                                <TaskWorkLog taskObject = {taskdetails} />
                            </Tab>
                            {/* <Tab eventKey="contact" title="Contact" disabled>
                                
                            </Tab> */}
                        </Tabs>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div style={{marginRight: 0, marginTop:25}}>
                        <TaskDetailsTimeline taskObject = {taskdetails} />
                    </div>
                </div>
            </div>
            {/* <div className="flex-container" style={{verticalAlign: 'top'}}>
                <div style={{width:'80%', marginLeft: '100px', marginRight: '50px'}}>
                    
                    
                    
                </div>
                <div style={{width:'20%'}}>
                    <div style={{width:'100%', marginLeft: '0px', marginRight: '100px', verticalAlign:'top'}}>
                        
                    </div>
                </div>
            </div> */}
        </div>)
}

export default TaskDetails;