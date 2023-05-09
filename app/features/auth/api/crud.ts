import axios from "axios";

export const createAccount = (data: any) => {
    const url = `https://pokedexeu-l0yx.onrender.com/users`;

    return axios.post(url, data);
}

export const dateLoginToUserAccount = (userId: number) => {
    const url = `https://pokedexeu-l0yx.onrender.com/users/${userId}`;

    return axios.patch(url, { lastLogin: new Date() });
}

export const getUser = async (userId: number) => {
    const url = `https://pokedexeu-l0yx.onrender.com/users/${userId}`;

    return await axios.get(url).then(res => res.data);
}

export const getUsers = async () => {
    const url = `https://pokedexeu-l0yx.onrender.com/users`;

    return await axios.get(url).then(res => res.data);
}