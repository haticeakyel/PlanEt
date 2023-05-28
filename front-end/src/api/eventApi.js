import axios from "axios";

export const addEventApi = async({title, description, status, startDate, endDate}) => {

    const resp = await axios.post("http://localhost:3001/events", {
            title: title,
            description: description,
            status: status,
            startDate: startDate,
            endDate: endDate
        })
        return resp; 
}