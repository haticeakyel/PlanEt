import { ADD_EVENTS, GET_EVENTS } from "../actions/types";
const EventReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_EVENTS:
            return {...state, events:  [...state.events, action.payload]};
        case GET_EVENTS:
                return { ...state, events: action.payload };
            
        default:
            return state
    }
};

export default EventReducer;