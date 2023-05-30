import { listEventApi } from "../api/eventApi";
import { ADD_EVENTS, GET_EVENTS } from "./types";

export const addEventAct = (data) => async (
    dispatch
) => {
        dispatch({
            type: ADD_EVENTS,
            payload: data,
        });
};

export const fetchEvents = (id) => async (
    dispatch
) => {
    const res = await listEventApi(id);
    if (res)
        dispatch({
            type: GET_EVENTS,
            payload: res,
        });
};