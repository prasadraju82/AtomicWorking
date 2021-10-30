import React, { useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import TaskService from "../../../services/tasks";
import { Ul, Li, SuggestContainer } from '../style';
import { useSelector } from "react-redux";
import AuthService from "../../../services/auth.services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskUserAssignModal(props){

    const [leader, setLeader] = useState("");
    const [users, setUsers] = useState([]);
    const [suggestion, setSuggestion] = useState(true);
    const [userId, setUserId] = useState("");
    const[isAddButtonDisabled, setAddButton] = useState(true);
    const[isUserValid, setIsUserValid] = useState(false);

    const assignUser = () => {
        const userPayLoad = {
            taskId: props.tasks.taskId,
            userName: leader,
            userId: userId
        }

        TaskService.updateUserByTaskId(userPayLoad).then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.data.message);
            if(response.data.message === "Success"){
                toast("User Assigned Successfully");
                props.onHide();
            }
            else{
                toast("There is an error is update: " + response.message);
            }
            
        })
    }

    useEffect(() => {
        if(leader !== ""){
            setAddButton(false);
        }
        else{
            setAddButton(true);
        }
    },[leader])

    useEffect(() =>{
        TaskService.getUserByTaskId(props.tasks.taskId).then(response => {
            console.log(response.data);
            if(response !== undefined && response.data !== undefined)
            setLeader(response.data.data)
        })
    },[props.tasks.taskId])

    const getUsers = (username) => {
        setLeader(username);
        console.log(username);
        AuthService.getUsers(username).then(response =>
        {
            console.log(username)
            console.log(response)
            setUsers(response.data);
            setSuggestion(true);
        })
    }

    const selectElement = (usersname, userid) => {
        //console.log(user);
        document.getElementById("leader").value = usersname;
        setUserId(userid);
        setLeader(usersname);
        setSuggestion(false);
    }

    const showUserMessage = (val) => {
        if(val !== ""){
            setIsUserValid(false)
        }
        else{
            setIsUserValid(true)
        }
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
                        <h4 class="modal-title">Assign User</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                        <div className="flex-container">
                            <div style={{width:'15%', marginLeft: '0px',  marginTop: '5px',  marginBottom: '15px', fontFamily:'Arial', textAlign:'left', fontWeight: 'bold'}}>
                                Task Id: 
                            </div>
                            <div style={{width:'85%', marginLeft: '2px',  marginTop: '5px',  marginBottom: '15px'}}>
                               <span style={{fontFamily:'Arial'}}> {props.tasks.taskId} </span>
                            </div>
                        </div>
                        
                        <div>
                            <input id="leader" type="text" value={leader}  onChange={event => {getUsers(event.target.value)}} onBlur={event => showUserMessage(event.target.value)} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '400px', backgroundColor: '#ffffff'}} />
                                { suggestion && <SuggestContainer>
                                    <Ul>
                                        {/* {loading && <Li>Loading...</Li>} */}
                                        {users && users.length > 0 &&
                                            // !loading &&
                                            users.map((value, index) => (
                                                <Li
                                                    key={`${value._id}-${index}`}
                                                        onClick={() => selectElement(value.name, value._id)}
                                                >
                                                    {value.name}
                                                </Li>
                                            ))}
                                    </Ul>
                                </SuggestContainer> }
                        </div>
                        <div style={{position:'absolute', width:'350px', left:'15px'}}
                            className={`alert alert-danger ${isUserValid ? 'alert-shown' : 'alert-hidden'}`}
                            onTransitionEnd={() => setIsUserValid(false)}
                            >
                            <strong>Error:</strong> Please select an Assignee
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button onClick={() => assignUser()} disabled={isAddButtonDisabled} >Assign</Button><Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
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

export default TaskUserAssignModal;