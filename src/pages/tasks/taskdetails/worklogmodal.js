import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import TasksService from "../../../services/tasks";
import { useSelector } from "react-redux";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react';

function WorkLogModal(props){

    const [hours, setHours] = useState("");
    const [comment, setComment] = useState("");

    const [show, setShow] = useState(true);
    const[isAddButtonDisabled, setAddButton] = useState(true);
    const[isWorkLogValid, setIsWorkLogValid] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        if(hours !== ""){
            setAddButton(false);
        }
        else{
            setAddButton(true);
        }
    },[hours])

    const { user: currentUser } = useSelector((state) => state.auth);
    let userId = currentUser._id;
    let userName = currentUser.name
    let taskId = props.taskId;
    const addHours = () => {

        const workLogPayLoad ={
            taskId: taskId,
            logcomment: comment,
            loggedhours: hours,
            user: userId,
            userName: userName
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

    const getCKEditor = (event, editor) => {
        setComment(editor.getData())
        //console.log(comment);
    }

    const showWorkLogMessage = (val) => {
        if(val !== ""){
            setIsWorkLogValid(false)
        }
        else{
            setIsWorkLogValid(true)
        }
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
                    <input id="hours" type ="text"  class="form-control" style={{width:'100px'}}  onChange={event => {setHours(event.target.value)}} onBlur={event => showWorkLogMessage(event.target.value)} /><span>  (eg. 2h 40m)</span>
                </div>
                <div style={{position:'absolute', zIndex:'999999', width:'350px', left:'25px'}}
                    className={`alert alert-danger ${isWorkLogValid ? 'alert-shown' : 'alert-hidden'}`}
                    onTransitionEnd={() => setIsWorkLogValid(false)}
                    >
                    <strong>Error:</strong> Please log the time of your work
                </div>
                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'1%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'15px'}}>
                    <div style={{width:'100px'}}>Description:</div>
                </div>
                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'2px'}}>
                    {/* <textarea name="content" id ="comment" onChange={event => {setComment(event.target.value)}}></textarea> */}
                    <CKEditor
                            editor={ClassicEditor}
                            onInit = {editor =>{
                            
                            }}
                            // data={userComment}
                        //   config={editorConfig}
                            onChange={(event, editor) => getCKEditor(event, editor)}
                        >
                            
                    </CKEditor>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
                <Button onClick={() => addHours()} disabled={isAddButtonDisabled} >Save</Button><Button className="btn btn-danger" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default WorkLogModal;