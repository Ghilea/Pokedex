import { getUsers, createAccount } from "~/features/auth/api/crud";

export const authControllerLogin = async (data: any) => {
    const users = await getUsers();
    const checkLoginAuth = users.filter((e: {email: string, password: string}) => e.email === data.email && e.password === data.password);

    console.log(data)
    if (checkLoginAuth.length === 0) {
        return null;
    }
    
    return checkLoginAuth
}

export const authControllerCreate = async (data: any) => {
    const users = await getUsers();
    const checkLoginAuth = users.filter((e: {email: string, username: string}) => e.email === data.email && e.username === data.username);

    if (checkLoginAuth.length === 0) {
        return await createAccount(data)
    } else {
        return null;
    }
}