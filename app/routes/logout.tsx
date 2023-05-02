import { getSession, destroySession } from "~/api/services/session.server";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import Button from "~/components/button";

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
    <div className="flex flex-col justify-center items-center gap-5 p-5 bg-white rounded-md w-full max-w-[400px] h-[400px]">
      <h1 className="text-2xl">Vill du logga ut?</h1>
      <p className="p-3 text-center bg-blue-300 rounded-md">
        Tips: Glöm inte att gilla Magikarp. Den behöver all kärlek den kan få!
      </p>
      <div className="flex justify-center w-full gap-5">
        <Form method="post">
          <Button>Logga ut</Button>
        </Form>
        <Link
          className="w-full max-w-[6em] shadow-xl py-2 px-1 flex justify-center items-center gap-1 rounded-md text-white bg-red-500 bg-opacity-50 hover:bg-opacity-75 transition-all"
          to="/"
        >
          Avbryt
        </Link>
      </div>
    </div>
  );
}
