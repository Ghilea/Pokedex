export const createAccount = (data: any) => {
    const url = "http://localhost:3004/users";

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const dateLoginToUserAccount = (userId: number) => {
    const url = `http://localhost:3004/users/${userId}`;

    return fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ lastLogin: new Date() }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getUsers = async () => {
    const url = "http://localhost:3004/users";

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    return await res.json();
}

export const getUser = async (userId: number) => {
    const url = `http://localhost:3004/users/${userId}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await res.json();
}

export const ForgotPassword = (data: any) => {
    const url = "http://localhost:3004/users";

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}