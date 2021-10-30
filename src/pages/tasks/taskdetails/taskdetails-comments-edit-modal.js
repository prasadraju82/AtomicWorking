import React, { useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import ActivityService from "../../../services/activity";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskDetailsCommentEditModal(props){
    const [userComment, setUserComment] = useState("");

    const refreshParent = props.refreshComment;

    const getCKEditor = (event, editor) => {
        setUserComment(editor.getData())
        //console.log(comment);
    }

    const updateComment = () => {
        const act = {
            activityId: props.commentid,
            comment: userComment
        }

        ActivityService.updateActivityById(act).then(response => {
            if(response.data.message === "Success"){
                props.onHide();
                refreshParent();
               toast("Comment Updated Successfully");
            }
        })
    }

    useEffect(() => {
        
        ActivityService.getCommentById(props.commentid).then((response) => {
            if(response.data !== undefined){
                setUserComment(response.data.comment)
               
            }
        })

        console.log(userComment);
    },[props.commentid])

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
                        <h4 class="modal-title">Edit Comment: {props.taskid}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                        <div>
                            Commented By:
                        </div>
                        <div>
                            {props.username}
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
                        <Button onClick={() => updateComment()}>Save</Button><Button onClick={props.onHide}>Close</Button>
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
export default TaskDetailsCommentEditModal;