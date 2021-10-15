import React, { useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import TaskService from "../../../services/tasks";


function TaskDetailsSummaryEditModal(props){

    const typeOptions = [
        {
          label: "Enhancement",
          value: "1",
        },
        {
          label: "Feature",
          value: "2",
        },
        {
          label: "Bug",
          value: "3",
        },
        {
          label: "Investigate",
          value: "4",
        },
        {
          label: "Change",
          value: "5",
        }
    ];

    const statusOptions = [
        {
          label: "Open",
          value: "1",
        },
        {
          label: "Re-Open",
          value: "2",
        },
        {
          label: "In Progress",
          value: "3",
        },
        {
          label: "Staging",
          value: "4",
        },
        {
          label: "To Deploy",
          value: "5",
        },
        {
          label: "On Live",
          value: "6",
        }
    ];
    console.log(props.tasks);

    const [taskName, setTaskName] = useState(props.tasks.taskName);
    const [taskType, setTaskType] = useState(props.tasks.taskTypeId);
    const [taskStatus, setTaskStatus] = useState(props.tasks.taskTypeId);
    const [taskPriority, setTaskPriority] = useState(props.tasks.priorityId);
    const [taskDesc, setTaskDesc] = useState(props.tasks.taskDesc);

    // const [task, setTask] = useState({
    //     taskName: props.tasks.taskName,
    //     taskType: props.tasks.taskTypeId,
    //     taskStatus: props.tasks.statusId,
    //     taskPriority: props.tasks.priorityId,
    //     taskDesc: props.tasks.taskDesc
    // });

    useEffect(() => {
        // const myTaskObject = {
        //     taskName: props.tasks.taskName,
        //     taskType: props.tasks.taskTypeId,
        //     taskStatus: props.tasks.statusId,
        //     taskPriority: props.tasks.priorityId,
        //     taskDesc: props.tasks.taskDesc
        // }

        setTaskName(props.tasks.taskName);
        setTaskType(props.tasks.taskTypeId);
        setTaskStatus(props.tasks.statusId);
        setTaskPriority(props.tasks.priorityId);
        setTaskDesc(props.tasks.taskDesc)
        //setTask(myTaskObject)
    },[props.tasks])

    const handleChange = event =>{
        console.log(event.target.value);
        const {id, value} = event.target;
        //setTask({...task, [id] : value})
    };

    console.log(props.tasks);
    const priorityOptions = [
        {
          label: "Normal",
          value: "1",
        },
        {
          label: "High",
          value: "2",
        },
        {
          label: "Low",
          value: "3",
        },
        {
          label: "Urgent",
          value: "4",
        }
    ];

    const updateTaskSummary = () => {
        const taskPayLoad = {
            taskId: props.tasks.taskId,
            taskName: taskName,
            taskTypeId: taskType,
            statusId: taskStatus,
            priorityId: taskPriority,
            taskDesc: taskDesc
        }

        TaskService.updateTaskByTaskId(taskPayLoad).then((response) => {
            if(response.data.message === "Success"){
                props.onHide()
            }
        }).catch((error) => console.log(error.message));
    }

return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            <h4 class="modal-title">Edit Task: {props.tasks.taskId}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div class="modal-body">
        <div>
                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'1%', left:'2%', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold', paddingTop:'15px'}}>
                    <div id="dvUserName" style={{width:'300px'}}>Summary:<span style={{color:'red'}}>*</span></div>
                </div>
                <div style={{display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'2px'}}>
                    <input id="taskName" type ="text" value={taskName}  class="form-control" style={{width:'300px'}} onChange={event => {setTaskName(event.target.value)}} />
                </div>
                <div  style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold', paddingTop:'15px'}}>
                    <div style={{width:'300px'}}>Type:<span style={{color:'red'}}>*</span></div>
                </div>
                <div style={{display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'2px'}}>
                    <select id="taskType" class="selcls" style={{width:'120px'}} value={taskType} onChange={event => {setTaskType(event.target.value)}}>
                        {typeOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold', paddingTop:'15px'}}>
                    <div style={{width:'300px'}}>Status:<span style={{color:'red'}}>*</span></div>
                </div>
                <div style={{display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'2px'}}>
                    <select id="taskStatus" class="selcls" style={{width:'120px'}} value={taskStatus} onChange={event => {setTaskStatus(event.target.value)}}>
                        {statusOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold', paddingTop:'15px'}}>
                    <div style={{width:'300px'}}>Priority<span style={{color:'red'}}>*</span></div>
                </div>
                <div style={{display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'2px'}}>
                    <select id="taskPriority" class="selcls" style={{width:'120px'}} value={taskPriority} onChange={event => {setTaskPriority(event.target.value)}}>
                        {priorityOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div style={{textAlign:'left', display:'block', margin: '0 auto', position:'relative', top:'1%', left:'2%', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold', paddingTop:'15px'}}>
                    <div style={{width:'300px'}}>Description:</div>
                </div>
                <div style={{display:'block', margin: '0 auto', position:'relative', top:'5%', left:'2%',fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold',paddingTop:'2px'}}>
                    <textarea name="content" value={taskDesc} id ="taskDesc" onChange={event => {setTaskDesc(event.target.value)}}></textarea>
                </div>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
            <Button onClick={() => updateTaskSummary()}>Save</Button><Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskDetailsSummaryEditModal;
