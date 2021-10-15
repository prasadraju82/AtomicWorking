
const initialState = {};

// {
//     usertask:[
//         {
//             taskId: "",
//             taskName: "",
//             taskDescription: ""
//         }
//     ]
// }


function tasks(state = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case "FETCH_TASK":
            return{
                ...state,
                usertask: payload.task
            }
    
        default:
            return state 
    }
}

export default tasks;