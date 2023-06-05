import { GET_EVENT_BY_ID } from "../actions/types";

const AnEventReducer = (state = {}, action) => {
  switch (action.type) {
    
    case GET_EVENT_BY_ID:
      return action.payload;
    default:
      return state;
  }
};

export default AnEventReducer;
