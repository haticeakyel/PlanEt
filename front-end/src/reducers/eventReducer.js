import { ADD_EVENTS, DELETE_EVENT, GET_EVENTS, UPDATE_EVENT } from "../actions/types";
const EventReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_EVENTS:
            return {...state, events:  [...state.events, action.payload]};
        case GET_EVENTS:
                return { ...state, events: action.payload };
        case DELETE_EVENT:
            return { ...state, events: [...state.events].filter((item) => item.id !== action.payload) };
        case UPDATE_EVENT:
            const editData = {...state}
            editData.map((item, index) =>{
                if(action.payload.id == item.id){
                    editData[index].title = action.payload.title
                    editData[index].description= action.payload.description
                    editData[index].status = action.payload.status
                    editData[index].startDate = action.payload.startDate;
                    editData[index].endDate = action.payload.endDate;
                    } 
            })
            return editData
        default:
            return state
    }
};

export default EventReducer;