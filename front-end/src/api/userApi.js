import axios from 'axios';

export const registerUser = async ({name, surname, email, password}) => {
    const resp = await axios.post("http://localhost:3001/register", {
        name : name,
        surname: surname,
        email: email,
        password: password
    }

    )

    return resp.status === 201 ? resp : false
}

export const loginUser = async ({email, password}) => {
    const resp = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password
    },
    {
        withCredentials: true
    }
    )

    return resp.status === 201 ? resp : false
}