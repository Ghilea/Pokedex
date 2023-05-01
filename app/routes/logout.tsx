import { getSession, destroySession } from "~/sessions";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

interface ActionRequest {
    request: Request;
}
export const action = async ({ request }: ActionRequest) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <>
      <p>Vill du logga ut?</p>
      <Form method="post">
        <button>Logga ut</button>
      </Form>
      <Link to="/">Avbryt</Link>
    </>
  );
}
