import { getUsers, createAccount } from "~/features/auth/api/crud";

export const authControllerLogin = async (data: any) => {
    const users = await getUsers();
    const checkLoginAuth = users.filter((e: any) => e.email === data.username && e.password === data.password);

    if (checkLoginAuth.length === 0) {
        return "Ogiltigt användarnamn eller lösenord";
    }
    
    return checkLoginAuth
}

export const authControllerCreate = async (data: any) => {

    const created = await createAccount(data);

    return created ? true : false;
}