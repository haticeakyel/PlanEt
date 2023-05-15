import { ADD_EVENTS } from "./types";

export const addEvent = (data) => async (
    dispatch
) => {
        dispatch({
            type: ADD_EVENTS,
            payload: data,
        });
};