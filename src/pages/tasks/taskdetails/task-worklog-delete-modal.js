import React, { useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import TaskService from "../../../services/tasks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskWorkLogDeletetModal(props){
    const refreshParent = props.refreshComment;
    const deleteComment = () => {
        TaskService.deleteWorkLogById(props.commentid).then((response) => {
            if(response.data.message === "Success"){
               refreshParent();
               toast("Worklog Deleted Successfully");
               props.onHide();
            }
        }).catch((error) => {console.log(error)})
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
                        <h4 class="modal-title">Delete Comment</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                        <span style={{fontWeight:'bold'}}>Are you sure you want to delete this worklog?</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button onClick={() => deleteComment()}>Delete</Button><Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-center"
                autoClose={3000}
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

export default TaskWorkLogDeletetModal;