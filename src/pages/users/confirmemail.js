import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import UserServices from "../../services/users";

function ConfirmEmail(props){
    let history = useHistory();
    const {state} = history.location;
    console.log(props);

    const [isActivated, setIsActivated] = useState(false);

    let link = props.location.pathname;
    let path = link.split('/')
    console.log(path[0]);
    console.log(path[1]);
    console.log(path[2]);

    let emailId = path[2];

    useEffect(() => {
        const userPayLoad ={
            emailid: emailId
        }

        UserServices.activateUser(userPayLoad).then(response => {
            console.log(response);
            if(response.status === 200){
                setIsActivated(true);
            }
        })
    }, [emailId])

    const activateUser = () => {
        const userPayLoad ={
            emailid: emailId
        }

        UserServices.activateUser(userPayLoad).then(response => {
            if(response.status === 200){
                setIsActivated(true);
            }
        })
    }

    const redirectToLoginIn = () => {
        history.push('/')
    }

    return(<div>
        {isActivated && <div> Congratulations your account has been confirmed. Please <a style={{color: 'royalblue'}} onClick={() => redirectToLoginIn()}>Sign In</a> to access your account.
            </div>}
    </div>)
}

export default ConfirmEmail;