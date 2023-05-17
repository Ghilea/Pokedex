import { getUsers, createAccount } from "~/features/auth/api/crud";
import moment from "moment";

export const authControllerLogin = async (data: any) => {
    const users = await getUsers();
    const checkLoginAuth = users.filter((e: { email: string, password: string }) => e.email === data.email && e.password === data.password);

    switch (true) {
        case checkLoginAuth.length !== 0:
            return { success: checkLoginAuth[0]};
        case checkLoginAuth.length === 0:
            return { error: 'Ogiltig epost eller lösenord!' };
        default:
            return { error: 'Kunde inte logga in, försök igen!' };
    }
}

export const authControllerCreate = async (data: any) => {
    const users = await getUsers();

    const emailOrUsernameExist = users.filter((e: { email: string, username: string }) => e.email === data.email || e.username === data.username);

    const passwordMatch = data.password === data.confirmPassword;

    switch (true) {
        case (emailOrUsernameExist.length === 0 && passwordMatch):
            createAccount({ username: data.username, email: data.email, password: data.password, lastLogin: moment().format('YYYY-MM-DD HH:mm:ss') });
            return { success: 'Grattis, Du har nu ett konto. Vänligen logga in!' };
        case !passwordMatch:
            return { error: 'Var vänlig matcha lösenorden!' }
        case emailOrUsernameExist.length !== 0:
            return { error: 'Användarnamn eller eposten används redan!' }
        default:
            return { error: 'Kunde inte skapa konto, försök igen!' };
    }
}