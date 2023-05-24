import { authenticatedUser } from "../api/userApi"
import { USER } from "./types"

export const authUser = () => async (
    dispatch
    ) => {
        const resp = await authenticatedUser()
        dispatch({
            type: USER,
            payload: resp.data
        })
    }   