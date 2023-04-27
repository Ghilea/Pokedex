export const createAccount = (body: any) => {
    const url = "http://localhost:3004/users";

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
  
}


export const LoginToAccount = (body: any) => {
    const url = "http://localhost:3004/users";

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });

}

export const ForgotPassword = (body: any) => {
    const url = "http://localhost:3004/users";

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });

}