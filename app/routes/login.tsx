import AuthForm from "~/features/auth/authFormLogin";
import { authControllerLogin } from "~/features/auth/authController";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "~/services/session.server";
import { dateLoginToUserAccount } from "~/features/auth/api/crud";
import addOrUpdatePokemonLikes from "~/features/likes";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Logga in" }];
};

export default function Login() {
  const { error, success } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="mb-16 text-5xl text-white">Logga in</h1>
      <div className="flex flex-col items-center justify-center w-full h-full max-w-[40em]">
        {error ? <div className="text-white">{error}</div> : null}
        {success ? <div className="text-white">{success}</div> : null}
        <AuthForm />
      </div>
    </>
  );
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const validation = await authControllerLogin(data);

  if (validation.hasOwnProperty("error")) {
    session.flash("error", String(validation.error));

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", validation.success);

  addOrUpdatePokemonLikes(validation.success);
  dateLoginToUserAccount(validation.success.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/");
  }

  const data = { error: session.get("error"), success: session.get("success") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
