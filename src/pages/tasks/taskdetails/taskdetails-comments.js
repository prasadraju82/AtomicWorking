import React, { useState, useEffect } from "react";
import "../../../css/tasks.css";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js'
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone';
import { useSelector } from "react-redux";
import ActivityService from "../../../services/activity";

const API_URL = "http://localhost:5000/api/activity/";

function TaskDetailsComment(props){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState(EditorState.createEmpty())
    const [allTask, setAllTask] = useState([]);
    const [comment, setComment] = useState([])
    const [activities, setActivities] = useState([]);
    const [showCommentArea, setCommentArea] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    let taskId = props.taskObject.taskId;

    const getactivities = (taskid) => {
        axios.get(API_URL + "getactivity/" + taskid).then(res => {
            setActivities(res.data);
        })
    }

    useEffect(() => {
        getactivities(taskId);
    },[props.taskObject])

    
    const saveComment = () =>{
        const activityPayLoad = {
            userId: currentUser.id,
            userName: currentUser.name,
            comment: comment,
            taskId: taskId,
            commentDate: Date.now
        }

        ActivityService.saveActivity(activityPayLoad).then((response) => {
            if(response.data.message === "Success"){
                console.log(comment);
                setActivities([...activities, response.data]);
                setCommentArea(false)
            }
        }).catch((error) => console.log(error.message));;
    }
    console.log(currentUser);
    //console.log(activities);
    return (
        <div>
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'bold', paddingLeft:'15px', paddingTop:'15px', letterSpacing: 'normal', width: '25%'}}>
                Activity
            </div>
            <div>
                {
                    activities.map((activity, index) => {
                        return(
                            <div>
                                <div className="flex-container" id="cmtDetails">
                                    <div id="cmtDetails1" style={{marginLeft: '15px', height:'30px', paddingTop:'7px', fontSize: '13px', fontFamily: 'Arial, Helvetica, sans-serif', paddingLeft:'5px', paddingRight:'5px', fontWeight: 'normal', textAlign:'center', verticalAlign:'middle', color:'#cccccc'}}>
                                        Commented: 
                                    </div>
                                    <div id="cmtDetails2" style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', fontWeight: 'normal', paddingLeft:'15px', letterSpacing: 'normal', color: '#dcdcdc'}}>
                                        <Moment format="DD-MMM-YYYY">
                                            {activity.createdDateTime}
                                        </Moment>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="flex-container" id="cmtDetails2">
                                    <div id="cmtDetails1" style={{marginLeft: '15px', height:'30px', paddingTop:'7px', fontFamily: 'Arial, Helvetica, sans-serif', paddingLeft:'5px', paddingRight:'5px', borderRadius:'15px', backgroundColor:'#EF6C00', fontWeight: 'bold', textAlign:'center', verticalAlign:'middle'}}>
                                        RP
                                    </div>
                                    <div id="cmtDetails2" style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 'normal', paddingLeft:'15px', letterSpacing: 'normal'}}>
                                        {activity.userId}
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div class="flex-container" id="cmtDetailslnk">
                                    <div><a id="lnkEdit" className="nav-link" style={{marginLeft:'50px', color: '#546E7A', cursor:'pointer', fontWeight: 'bold', fontSize: '12px'}}>Edit</a></div>
                                    <div><a id="lnkDelete" className="nav-link" style={{marginLeft:'-15px', color: '#546E7A', cursor:'pointer', fontWeight: 'bold', fontSize: '12px'}}>Delete</a></div>
                                </div>
                                
                            </div>
                            
                        )
                    })
                }
            </div>
            <div id="divComment" style={{margin: '0 auto', position:'relative', top:'5%', left:'2%', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold', paddingTop:'15px'}}>
                {showCommentArea && 
                    <div>
                        <textarea name="content" id ="txtComment" style={{width:'80%'}} onChange={event => {setComment(event.target.value)}}></textarea>
                        <div class="flex-container" style={{marginTop:'5px', width:'80%'}}>
                            <div><button type="button" class="btn btn-primary" data-dismiss="modal" onClick ={() => saveComment()}>Save</button></div>
                            <div><button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setCommentArea(false)} style={{marginLeft:'5px'}}>Cancel</button></div>
                        </div>
                    </div>
                }
            </div>
            
            <div style={{marginLeft: '15px', paddingBottom:'5px', paddingTop:'25px'}}><button id="btnComment" onClick={() => setCommentArea(true)} class="btn btn-primary" style={{height:'30px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', color:'#263238', fontWeight: 'bold'}}>Add Comment</button></div>
            {/* <div>
                <Editor editorState={description}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    wrapperStyle={{ border: "2px solid green", marginBottom: "20px" }}
                    editorStyle={{ height: "300px", padding: "10px"}}
                    //toolbar={{ image: { uploadCallback }}}
                    onEditorStateChange={editorState => setDescription(editorState)} ></Editor>
            </div> 
            <div>
                <button type="button"  className="btn btn-light" onClick={() => onSubmit()}>Submit</button>
            </div>
            <div>
                <div className="readonly-editor">
                    <Editor editorState={storedState} readOnly={true} /> 
                </div>
                {/* <div dangerouslySetInnerHTML={convertFromJSONToHTML(allTask)} ></div > 
            </div>
            <div>
                <button type="button"  className="btn btn-light" onClick={() => getTasks()}>Get Tasks</button>
            </div>
            {/* <div>
                <div dangerouslySetInnerHTML={convertFromJSONToHTML(description)} > </div >
            </div> */}
            
        </div>
    )
}

export default TaskDetailsComment;