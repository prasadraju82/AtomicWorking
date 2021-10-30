import React from 'react';
import UserServices from "../../services/users";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteUserModal(props){

    console.log(props.userId);
    const refreshParent = props.refreshUserList;

    const deleteUser = () => {
        UserServices.deleteUserById(props.userId).then((response) => {
            if(response.data.message === "Success"){
                refreshParent();
               toast("User Deleted Successfully");
               props.onHide();
            }
        }).catch((error) => {console.log(error)})
    } 
    return(
            <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4 class="modal-title">Delete User</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                        <span style={{fontWeight:'bold'}}>Are you sure you want to delete this user?</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button onClick={() => deleteUser()}>Delete</Button><Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
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
            </div>)
}

export default DeleteUserModal;