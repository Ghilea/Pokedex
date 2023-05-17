import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
    userId: string;
    params: any
};

type SessionFlashData = {
    error: string;
    success: string | Array<any>;
};

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>(
        {
            cookie: {
                name: "__session",
                httpOnly: true,
                //maxAge: 60,
                path: "/",
                sameSite: "lax",
                secrets: ["booiq"],
                //secure: true, // uncomment this line if you're using HTTPS
            },
        }
    );

export { getSession, commitSession, destroySession };