import React from "react";
import "../../../css/tasks.css";
import WorkLogModal from './worklogmodal';
import { useSelector } from "react-redux";
import TaskDetailsSummaryEditModal from './taskdetails-summary-edit-modal';
import TaskUserAssignModal from "./task-user-assign-modal";

function TaskDetailsSummary(props){

    const [workLogModalShow, setWorkLogModalShow] = React.useState(false);
    const [taskSummaryEditModalShow, setTaskSummaryEditModalShow] = React.useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [taskUserAssignModalShow, setUserAssignModalShow] = React.useState(false);

    const createMarkup = (usercomment) => {
        console.log("comment: " + usercomment);
        return { __html: usercomment };
      }
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
                        {props.taskObject.taskId}: {props.taskObject.taskName}
                    </div>
                </div>  
                <div className="flex-container">
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        Type: 
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        {props.taskObject.taskType}
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        Status:
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        {props.taskObject.statusName}
                    </div>
                </div>
                <div className="flex-container">
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        Priority: 
                    </div>
                    <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                        {props.taskObject.priority}
                    </div>
                </div>
                <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                    Description
                </div>
                <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'0px', letterSpacing: 'normal'}}>
                <div dangerouslySetInnerHTML= {createMarkup(props.taskObject.taskDesc)} className='editor'></div> 
                </div>
            </div> 
            <hr/>   
            <WorkLogModal show = {workLogModalShow} onHide={() => setWorkLogModalShow(false)} user = {currentUser.id} taskId = {props.taskObject.taskId}/>
            <TaskDetailsSummaryEditModal show = {taskSummaryEditModalShow} onHide={() => setTaskSummaryEditModalShow(false)} tasks = {props.taskObject} />
            <TaskUserAssignModal show = {taskUserAssignModalShow} onHide={() => setUserAssignModalShow(false)} tasks = {props.taskObject} />
        </div>
    )
}

export default TaskDetailsSummary;