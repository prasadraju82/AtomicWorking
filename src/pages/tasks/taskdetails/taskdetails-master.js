import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import Navbar from '../../../components/Navbar'
import TasksService from "../../../services/tasks";
import "../../../css/tasks.css";
import TaskDetailsSummary from './taskdetails-summary';
import TaskDetailsComment from './taskdetails-comments';
import TaskDetailsTimeline from './taskdetails-timeline';
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
            <Navbar />
            <div className="flex-container" style={{verticalAlign: 'top'}}>
                <div style={{width:'80%', marginLeft: '100px', marginRight: '50px'}}>
                    <TaskDetailsSummary taskObject = {taskdetails} />
                    <TaskDetailsComment taskObject = {taskdetails} />
                </div>
                <div style={{width:'20%'}}>
                    <div style={{width:'100%', marginLeft: '0px', marginRight: '100px', verticalAlign:'top'}}>
                        <TaskDetailsTimeline taskObject = {taskdetails} />
                    </div>
                </div>
            </div>
        </div>)
}

export default TaskDetails;