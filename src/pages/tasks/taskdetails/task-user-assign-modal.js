import React, { useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import TaskService from "../../../services/tasks";
import { Ul, Li, SuggestContainer } from '../style';
import { useSelector } from "react-redux";
import AuthService from "../../../services/auth.services";

function TaskUserAssignModal(props){

    const [leader, setLeader] = useState("");
    const [users, setUsers] = useState([]);
    const [suggestion, setSuggestion] = useState(true);
    const [userId, setUserId] = useState("");
    
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
                alert("User Assigned Successfully");
                props.onHide();
            }
            else{
                alert("There is an error is update: " + response.message);
            }
            
        })
    }

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
                            <input id="leader" type="text" value={leader}  onChange={event => {getUsers(event.target.value)}} style={{border: 'thin solid #CCCCCC', borderRadius:'5px', height:'25px', width: '400px', backgroundColor: '#ffffff'}} />
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button onClick={() => assignUser()}>Assign</Button><Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TaskUserAssignModal;