
const initialState = {
    usertask:{

    }
};

// {
//     usertask:
//         {
//             taskId: "",
//             taskName: "",
//             taskDescription: ""
//         }
    
// }


function tasks(state = initialState, action){
    const { type, payload } = action;
    console.log(payload);
    console.log(type);
    switch (type) {
        case "FETCH_TASK":
            return{
                ...state,
                usertask: payload.task
            };
        case "ASSIGN_USER_TO_TASK":
            return{
                ...state,
                usertask: payload.task
            };

        default:
            return state 
    }
}

export default tasks;