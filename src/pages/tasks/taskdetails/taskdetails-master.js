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
import { Container } from "react-bootstrap";
import { getTaskById } from "../../../action/tasks";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TaskDetails(){
    // const {state} = history.location;
    // console.log("taskId: " + state.taskid);
    const [taskdetails, setTaskDetails] = useState([]);
    //const { task: currentTask } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const {taskId }= useParams();
    const { usertask: currentTask } = useSelector((state) => state.tasks);
    // dispatch(getTaskById({taskId: state.taskid}).then(
    //     function(response){
    //         setTaskDetails(response);
    //     }
    // ))

    console.log("currentTask");
    console.log(currentTask);
    //console.log(taskdetails);
    useEffect(() => {
        getTaskByIdinMaster();
    },[])

    const getTaskByIdinMaster = () => {
        console.log("masterpage: " + taskId);
        dispatch(getTaskById(taskId))
        // TasksService.getTaskById(taskId).then(response => {
        //     console.log("master page: " + response.data);
        //     setTaskDetails(response.data);
        // })
    }

   // console.log("master page state: " + currentTask);
    return(<div>
            <Navigation isProj = {false} isUser = {false} isTask = {true} />
            <Container fluid>
            <div class="row">
                <div className="col-sm-8">
                    <div style={{marginLeft: '50px', marginTop:25}}>
                        <TaskDetailsSummary taskId = {taskId} />
                    </div>
                    <div style={{marginLeft: '50px'}}>
                        <Tabs defaultActiveKey="comment" id="uncontrolled-tab-example" className="mb-2">
                            <Tab eventKey="comment" title="Comment">
                                <TaskDetailsComment taskObject = {currentTask} />
                            </Tab>
                            <Tab eventKey="worklog" title="Work Log">
                                <TaskWorkLog taskObject = {currentTask} />
                            </Tab>
                            {/* <Tab eventKey="contact" title="Contact" disabled>
                                
                            </Tab> */}
                        </Tabs>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div style={{marginRight: 0, marginTop:25}}>
                        <TaskDetailsTimeline taskObject = {currentTask} />
                    </div>
                </div>
            </div>
            </Container>
        </div>)
}

export default TaskDetails;