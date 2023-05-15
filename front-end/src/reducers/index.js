import {combineReducers} from "redux";
import EventReducer from "./eventReducer";

const reducers = combineReducers({
    events :EventReducer
});

export default reducers;