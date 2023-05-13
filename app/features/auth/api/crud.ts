import axios from "axios";
import moment from "moment";

export const createAccount = async (data: any) => {
    const url = `http://217.210.173.199:3004/createAccount`;
    await axios.post(url, data);
}

export const dateLoginToUserAccount = async (userId: number) => {
    const url = `http://217.210.173.199:3004/updateLoginDate`;
    return await axios.patch(url, { userId: userId, lastLogin: moment().format('YYYY-MM-DD HH:mm:ss') });
}

export const getUser = async (userId: number) => {
    const url = `http://217.210.173.199:3004/getUser?userId=${userId}`;
    return await axios.get(url).then(res => res.data);
}

export const getUsers = async () => {
    const url = `http://217.210.173.199:3004/getUsers`;
    return await axios.get(url).then(res => res.data);
}