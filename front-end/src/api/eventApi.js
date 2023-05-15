import axios from "axios";

export const addEvent = async({title, description, status, duration}) => {

    const resp = await axios.post("http://localhost:3001/events", {
            title: title,
            description: description,
            status: status,
            duration: duration,
        })
        return resp; 
}