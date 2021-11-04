const initialState = {
    userworklogs : []
};

function worklog(state = initialState, action){
    const { type, payload } = action;
    console.log(state);
    switch (type) {
        case "FETCH_WORKLOG":
            return{
                ...state,
                userworklogs: payload.worklogs
            };
        case "ADD_WORKLOG":
            return{
                ...state,
                userworklogs: [...state.userworklogs, payload.worklogs.data]
            };
        default:
            return state 
    }
}

export default worklog;