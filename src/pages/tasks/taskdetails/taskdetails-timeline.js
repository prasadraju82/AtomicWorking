import React from "react";
import "../../../css/tasks.css";
import Moment from 'react-moment';
import 'moment-timezone';

function TaskDetailsTimeline(props){
    console.log(props.taskObject)
    let assignee= props.taskObject.assignedUser;
    let creator = props.taskObject.creatorUser;
    let creationDate = props.taskObject.createdDateTime;
    let updatedDate = props.taskObject.updatedDateTime;

    return(<div>
        <div className="flex-container">
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color:'#263238', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '50%' }}>
                Assignee: 
            </div>
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color:'#263238', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal' }}>
                {assignee}
            </div>
        </div>
        <div className="flex-container">
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color:'#263238', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '50%' }}>
                Reporter:
            </div>
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color:'#263238', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal' }}>
                {creator}
            </div>
        </div>
        <div className="flex-container">
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color:'#263238', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '50%' }}>
                Creation Date: 
            </div>
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color:'#263238', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal' }}>
                <Moment format="DD-MMM-YYYY">
                    {creationDate}
                </Moment>
               
            </div>
        </div>
        <div className="flex-container">
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color:'#263238', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '50%' }}>
                Start Date:
            </div>
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color:'#263238', fontWeight: 'normal', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal' }}>
                <Moment format="DD-MMM-YYYY">
                    {updatedDate}
                </Moment>
            </div>
        </div>
    </div>)
}

export default TaskDetailsTimeline;