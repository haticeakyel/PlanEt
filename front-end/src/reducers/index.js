import {combineReducers} from "redux";
import EventReducer from "./eventReducer";
import UserReducer from "./userReducer";

const reducers = combineReducers({
    events :EventReducer,
    user: UserReducer,
});

export default reducers;