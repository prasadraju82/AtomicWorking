import React, { useState, useEffect } from "react";
import "../../../css/tasks.css";
import WorkLogModal from './worklogmodal';
import { useSelector } from "react-redux";
import TaskDetailsSummaryEditModal from './taskdetails-summary-edit-modal';
import TaskUserAssignModal from "./task-user-assign-modal";
import TasksService from "../../../services/tasks";

function TaskDetailsSummary(props){

    const [workLogModalShow, setWorkLogModalShow] = useState(false);
    const [taskSummaryEditModalShow, setTaskSummaryEditModalShow] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [taskUserAssignModalShow, setUserAssignModalShow] = useState(false);
    const [taskdetails, setTaskDetails] = useState([]);
    const createMarkup = (usercomment) => {
        console.log("comment: " + usercomment);
        return { __html: usercomment };
      }

    useEffect(() =>{
        TasksService.getTaskById(props.taskId).then(response => {
            console.log("master page: " + response.data);
            setTaskDetails(response.data);
        })
    },[props.taskId])
    
    const refreshState = () => {
        TasksService.getTaskById(props.taskId).then(response => {
            console.log("master page: " + response.data);
            setTaskDetails(response.data);
        })
    }

    console.log(taskdetails);
    //console.log(currentUser);
    // const { task: currentTask } = useSelector((state) => state.task);

    // console.log("Summary: " + currentTask)

    // console.log("Summary: " + props.taskObject);

    // console.log("id: " + props.taskObject.id);
    // console.log("taskName: " + props.taskObject.taskName);
    // console.log("Summary: " + props.taskObject.taskId);
    return(
        
        <div>
            <div>
                <div className="flex-container">
                    <div><button className="btn btn-light" id="myBtn" onClick={() => setTaskSummaryEditModalShow(true)}>Edit</button></div>
                    {/* <div><button className="btn btn-light" onClick="showComment(event)">Comment</button></div> */}
                    <div><button className="btn btn-light" id="btnAssignee" onClick={() => setUserAssignModalShow(true)}>Assign</button></div>
                    <div><button className="btn btn-light" id="btnLogWork" onClick={() => setWorkLogModalShow(true)}>Log Work</button></div>
                </div>
            </div>
            <div style={{marginRight: '50px'}}>
                <div className="flex-container">
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '20px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal'}}>
                        {taskdetails.taskId}: {taskdetails.taskName}
                    </div>
                </div>  
                <div className="flex-container">
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        Type: 
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        {taskdetails.taskType}
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        Status:
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        {taskdetails.statusName}
                    </div>
                </div>
                <div className="flex-container">
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        Priority: 
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        {taskdetails.priority}
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        Estimated Time:
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        {taskdetails.estimatedTime}
                    </div>
                </div>
                <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                    Description
                </div>
                <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'0px', letterSpacing: 'normal'}}>
                <div dangerouslySetInnerHTML= {createMarkup(taskdetails.taskDesc)} className='editor'></div> 
                </div>
            </div> 
            <hr/>   
            <WorkLogModal show = {workLogModalShow} onHide={() => setWorkLogModalShow(false)} user = {currentUser.id} taskId = {taskdetails.taskId}/>
            <TaskDetailsSummaryEditModal show = {taskSummaryEditModalShow} onHide={() => setTaskSummaryEditModalShow(false)} tasks = {taskdetails} refreshTask = { refreshState }/>
            <TaskUserAssignModal show = {taskUserAssignModalShow} onHide={() => setUserAssignModalShow(false)} tasks = {taskdetails} />
        </div>
    )
}

export default TaskDetailsSummary;