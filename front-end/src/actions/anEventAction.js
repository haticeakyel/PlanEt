import { getEventbyIdApi } from "../api/eventApi";
import { GET_EVENT_BY_ID } from "./types";

export const fetchEventById = (userId, id) => async (
    dispatch
  ) => {
    const resp = await getEventbyIdApi(
      userId,
      id
    );
        dispatch({
            type: GET_EVENT_BY_ID,
            payload: resp.data,
        });
  };
  