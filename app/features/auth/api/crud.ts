import axios from "axios";
export const createAccount = (data: any) => {
    const url = `http://localhost:3004/createAccount`;
    return axios.post(url, data);
}

export const dateLoginToUserAccount = (userId: number) => {
    const url = `http://localhost:3004/updateLoginDate/`;

    return axios.patch(url, { userId: userId, lastLogin: new Date() });
}

export const getUser = async (userId: number) => {
    const url = `http://localhost:3004/user/`;

    return await axios.get(url, {
        params: {
            userId: userId
        }
    }).then(res => res.data);
}

export const getUsers = async () => {
    const url = `http://localhost:3004/getUsers`;

    return await axios.get(url).then(res => res.data);
}