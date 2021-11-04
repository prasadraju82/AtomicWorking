import React, { useEffect, useState } from "react";
import TasksService from "../../../services/tasks";
import Moment from 'react-moment';
import 'moment-timezone';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import ActivityService from "../../../services/activity";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import TaskService from "../../../services/tasks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskWorkLogEditModal(props){

    const [userComment, setUserComment] = useState("");
    const [logHours, setLogHours] = useState("");
    const refreshParent = props.refreshComment;
    const getCKEditor = (event, editor) => {
        setUserComment(editor.getData())
        //console.log(comment);
    }

    useEffect(() => {
        
        TaskService.getWorkLogById(props.commentid).then((response) => {
            console.log(response);
            if(response.data !== undefined && response.data){
                if(response.data.logComment){
                    setUserComment(response.data.logComment)
                }
                setLogHours(response.data.hoursLogged)
                console.log(response.data);
            }
        })

        
    },[props.commentid])

    const updateWorkLog = () =>{
        const worklog = {
            worklogId: props.commentid,
            comment: userComment,
            logHours: logHours
        }

        TaskService.updateWorkLog(worklog).then(response => {
            if(response.data.message === "Success"){
                props.onHide();
                refreshParent();
                toast("Work Log Updated Successfully");
            }
        })
    }

    return(
        <div>
            <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4 class="modal-title">Edit Comment:</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="modal-body">
                    <div>
                        Logged Hours:
                    </div>
                    <div>
                        <input id="hours" value={logHours} type ="text"  class="form-control" style={{width:'100px'}}  onChange={event => {setLogHours(event.target.value)}} /><span>  (eg. 2h 40m)</span>
                    </div>
                    <div>
                        <CKEditor
                            editor={ClassicEditor}
                            onInit = {editor =>{
                            
                            }}
                            data={userComment}
                        //   config={editorConfig}
                            onChange={(event, editor) => getCKEditor(event, editor)}
                        >
                            
                        </CKEditor>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                    <Button onClick={() => updateWorkLog()}>Save</Button><Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </div>
    )
}

export default TaskWorkLogEditModal;