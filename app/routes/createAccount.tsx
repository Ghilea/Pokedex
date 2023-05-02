import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import AuthForm from "~/features/auth/authFormCreate";
import { authControllerCreate } from "~/features/auth/authController";
import { useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "~/api/services/session.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Skapa konto" }];
};

export default function CreateAccount() {
  const { error } = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className="mb-16 text-5xl text-white">Skapa konto</h1>
      <div className="flex flex-col items-center justify-center w-full h-full max-w-[40em]">
        {error ? <div className="text-white error">{error}</div> : null}
        <AuthForm />
      </div>
    </>
  );
}


export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const validation = await authControllerCreate(data);

  if (validation === null) {
    session.flash("error", "Kunde inte skapa konto, försök igen.");

    return redirect("/createAccount", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  
  return redirect("/login");
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}