export const createAccount = (data: any) => {
    const url = `https://json-server-six-xi.vercel.app/users`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const dateLoginToUserAccount = (userId: number) => {
    const url = `https://json-server-six-xi.vercel.app/users/${userId}`;

    return fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ lastLogin: new Date() }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getUsers = async () => {
    const url = `https://json-server-six-xi.vercel.app/users`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await res.json();
}

export const getUser = async (userId: number) => {
    const url = `https://json-server-six-xi.vercel.app/users/${userId}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await res.json();
}

export const ForgotPassword = (data: any) => {
    const url = `https://json-server-six-xi.vercel.app/users`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}