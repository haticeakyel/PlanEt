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

export const fetchEvents = () => async (
    dispatch
) => {
    const resp = await listEventApi();
        dispatch({
            type: GET_EVENTS,
            payload: resp.data,
        });
};