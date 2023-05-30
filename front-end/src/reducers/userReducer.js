import { USER } from "../actions/types";
const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER:
            return  {...action.payload};
            
        default:
            return state
    }
};

export default UserReducer;