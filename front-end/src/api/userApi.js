import axios from 'axios';

export const registerUser = async ({name, surname, email, phoneNumber, password}) => {
    const resp = await axios.post("http://localhost:3001/register", {
        name : name,
        surname: surname,
        email: email,
        phoneNumber: phoneNumber,
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

export const authenticatedUser = async () => {
    const resp = await axios.get(`http://localhost:3001/user`,
    {withCredentials: true}
)
return resp;
}