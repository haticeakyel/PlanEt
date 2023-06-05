import {combineReducers} from "redux";
import EventReducer from "./eventReducer";
import UserReducer from "./userReducer";
import AnEventReducer from "./anEventReducer";

const reducers = combineReducers({
    events :EventReducer,
    user: UserReducer,
    event: AnEventReducer,
});

export default reducers;