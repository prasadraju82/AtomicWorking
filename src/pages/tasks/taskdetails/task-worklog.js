import React, { useEffect, useState } from "react";
import TasksService from "../../../services/tasks";
import Moment from 'react-moment';
import 'moment-timezone';
import TaskWorkLogEditModal from "./task-worklog-edit-modal";
import { useSelector, useDispatch } from "react-redux";
import TaskWorkLogDeletetModal from "./task-worklog-delete-modal";
import {getWorkLogByTaskId } from "../../../action/worklog";

function TaskWorkLog(props){
    const [workLogModalShow, setWorkLogModalShow] = useState(false);
    const [workLogId, setWorkLogId] = useState("");
    let taskId = props.taskObject.taskId;
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [workLogDeleteModalShow, setWorkLogDeleteModalShow] = useState(false);
    const { userworklogs: worklogss } = useSelector((state) => state.worklog);
    const getWorkLogs = (taskid) => {
        TasksService.getWorkLogsByTaskId(taskid).then(res => {
            console.log('task id:' + taskid)
            console.log(res.data);
            //setWorkLogs(res.data);
        })
    }

    console.log(worklogss);
    useEffect(() => {
        dispatch(getWorkLogByTaskId(taskId));
    },[dispatch, taskId])

    const getInitials = (username) => {
        let user = username.split(' ')
        let firstName = "";
        let secondName = "";
        if(user.length > 1){
            firstName = user[0];
            secondName = user[1];
            let firstLetter = firstName.charAt(0);
            let secondLetter = secondName.charAt(0);

            return firstLetter + secondLetter
        }
        else if(user.length === 1){
            firstName = user[0];
            let firstLetter = firstName.charAt(0);
            let secondLetter = secondName.charAt(1);
            return firstLetter + secondLetter;
        }
    }

    const createMarkup = (usercomment) => {
        //console.log("comment: " + usercomment);
        return { __html: usercomment };
    }

    const showWorkLogEdit = (comment_Id) =>{
        console.log(comment_Id);
        setWorkLogId(comment_Id);
        setWorkLogModalShow(true);
    }

    const refreshState = () => {
        dispatch(getWorkLogByTaskId(taskId));
    }

    const deleteWorklog = (comment_Id) =>{
        console.log(comment_Id);
        setWorkLogId(comment_Id);
        setWorkLogDeleteModalShow(true);
    }

    return (
        <div>
            <div>
                {
                    worklogss.map((worklog, index) => {
                        return(
                            <div>
                                <div className="flex-container" id="cmtDetails">
                                    <div id="cmtDetails1" style={{marginLeft: '15px', height:'30px', paddingTop:'7px', fontSize: '13px', fontFamily: 'Arial, Helvetica, sans-serif', paddingLeft:'5px', paddingRight:'1px', fontWeight: 'normal', textAlign:'center', verticalAlign:'middle', color:'#cccccc'}}>
                                        Work Logged: 
                                    </div>
                                    <div id="cmtDetails1" style={{marginLeft: '0px', height:'30px', paddingTop:'7px', fontSize: '13px', fontFamily: 'Arial, Helvetica, sans-serif', paddingLeft:'1px', paddingRight:'5px', fontWeight: 'normal', textAlign:'center', verticalAlign:'middle', color:'#cccccc'}}>
                                        {worklog.hoursLogged} 
                                    </div>
                                    <div id="cmtDetails2" style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', fontWeight: 'normal', paddingLeft:'5px', letterSpacing: 'normal', color: '#dcdcdc'}}>
                                        <Moment format="DD-MMM-YYYY">
                                            {worklog.createdDateTime}
                                        </Moment>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="flex-container" id="cmtDetails2">
                                    <div id="cmtDetails1" style={{marginLeft: '15px', height:'30px', paddingTop:'7px', fontFamily: 'Arial, Helvetica, sans-serif', paddingLeft:'5px', paddingRight:'5px', borderRadius:'15px', backgroundColor:'#EF6C00', fontWeight: 'bold', textAlign:'center', verticalAlign:'middle'}}>
                                        {getInitials(worklog.userName)}
                                    </div>
                                    <div dangerouslySetInnerHTML={createMarkup(worklog.logComment)} className='editor'></div>
                                    <div>

                                    </div>
                                </div>
                                <div class="flex-container" id="cmtDetailslnk">
                                    <div><a id="lnkEdit" className="nav-link" style={{marginLeft:'50px', color: '#546E7A', cursor:'pointer', fontWeight: 'bold', fontSize: '12px'}} onClick={() => showWorkLogEdit(worklog._id)}>Edit</a></div>
                                    <div><a id="lnkDelete" className="nav-link" style={{marginLeft:'-15px', color: '#546E7A', cursor:'pointer', fontWeight: 'bold', fontSize: '12px'}} onClick={() => deleteWorklog(worklog._id)}>Delete</a></div>
                                </div>
                                
                            </div>
                            
                        )
                    })
                }
            </div>
            <TaskWorkLogEditModal show = {workLogModalShow} onHide={() => setWorkLogModalShow(false)} commentid = { workLogId } refreshComment = { refreshState } taskid ={taskId} username ={currentUser.name} />
            <TaskWorkLogDeletetModal show = {workLogDeleteModalShow} onHide={() => setWorkLogDeleteModalShow(false)} commentid = { workLogId } refreshComment = { refreshState } taskid ={taskId} username ={currentUser.name} />
        </div>
    )
}

export default TaskWorkLog;