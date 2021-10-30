const initialState = [{

}];

function worklog(state = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case "FETCH_WORKLOG":
            return{
                ...state,
                userworklogs: payload.worklogs
            };
        case "ADD_WORKLOG":
            return{
                ...state,
                userworklogs: payload.worklogs
            };
        default:
            return state 
    }
}

export default worklog;