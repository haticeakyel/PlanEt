import { listEventApi, deleteEventApi } from "../api/eventApi";
import { ADD_EVENTS, DELETE_EVENT, GET_EVENTS, UPDATE_EVENT } from "./types";

export const addEventAct = (data) => async (
    dispatch
) => {
        dispatch({
            type: ADD_EVENTS,
            payload: data,
        });
};

export const fetchEvents = (userId) => async (
    dispatch
) => {
    const resp = await listEventApi(
      userId
    );
        dispatch({
            type: GET_EVENTS,
            payload: resp.data,
        });
};

export const deleteEvent = (userId,id) => async (dispatch) => {
    try {
      const success = await deleteEventApi(userId,id);
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

  export const updateEvent = (event) => async (
    dispatch
) => {
    dispatch({
        type: UPDATE_EVENT,
        payload: event,
    });
};