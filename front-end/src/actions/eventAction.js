import { listEventApi, deleteEventApi } from "../api/eventApi";
import { ADD_EVENTS, DELETE_EVENT, GET_EVENTS } from "./types";

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

export const deleteEvent = (id) => async (dispatch) => {
    try {
      const success = await deleteEventApi(id);
      if (success) {
        dispatch({
          type: DELETE_EVENT,
          payload: id,
        });
      } else {
      }
    } catch (error) {
    }
  };