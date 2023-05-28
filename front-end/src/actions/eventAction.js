import { ADD_EVENTS } from "./types";

export const addEventAct = (data) => async (
    dispatch
) => {
        dispatch({
            type: ADD_EVENTS,
            payload: data,
        });
};