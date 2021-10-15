import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import TasksService from "../../../services/tasks";

function WorkLogModal(props){

    const [hours, setHours] = useState("");
    const [comment, setComment] = useState("");

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let userId = props.user;
    let taskId = props.taskId;
    const addHours = () => {

        const workLogPayLoad ={
            taskId: taskId,
            logcomment: comment,
            loggedhours: hours,
            user: userId
        }

        TasksService.saveWorkLog(workLogPayLoad).then((response) => {
            console.log(response);
            if(response.data.message === "Success"){
                console.log("----")
                handleClose();
                props.onHide()
            }
        }).catch((error) => {return false})
        
    }
    return (
        <Modal show={show} onHide={handleClose}
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <h4 class="modal-title">Log your work</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'1%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'15px'}}>
                    <div style={{width:'300px'}}>Time:<span style={{color:'red'}}>*</span></div>
                </div>
                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'2px'}}>
                    <input id="hours" type ="text"  class="form-control" style={{width:'100px'}}  onChange={event => {setHours(event.target.value)}} /><span>  (eg. 2h 40m)</span>
                </div>

                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'1%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'15px'}}>
                    <div style={{width:'100px'}}>Description:</div>
                </div>
                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'2px'}}>
                    <textarea name="content" id ="comment" onChange={event => {setComment(event.target.value)}}></textarea>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
                <Button onClick={() => addHours()}>Save</Button><Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default WorkLogModal;