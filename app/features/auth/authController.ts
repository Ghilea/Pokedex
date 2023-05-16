import { getUsers, createAccount } from "~/features/auth/api/crud";
import moment from "moment";

export const authControllerLogin = async (data: any) => {
    const users = await getUsers();
    const checkLoginAuth = users.filter((e: { email: string, password: string }) => e.email === data.email && e.password === data.password);

    if (checkLoginAuth.length === 0) {
        return null;
    }

    return checkLoginAuth
}

export const authControllerCreate = async (data: any) => {
    const users = await getUsers();

    const emailOrUsernameExist = users.filter((e: { email: string, username: string }) => e.email === data.email && e.username === data.username);

    const passwordMatch = data.password === data.confirmPassword;

    const allGood = emailOrUsernameExist.length === 0 && passwordMatch

    switch (true) {
        case allGood:
            createAccount({ username: data.username, email: data.email, password: data.password, lastLogin: moment().format('YYYY-MM-DD HH:mm:ss') });
            return true;
        default:
            return null;
    }
}