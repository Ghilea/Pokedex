import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import appStyles from "./styles/app.css";
import cssReset from "./styles/components/reset.css";
import Navigation from "./features/navigation";
import { downloadPokemonFromAPI } from "~/api/crud";
import type { LoaderArgs } from "@remix-run/node";
import { getSession } from "./api/services/session.server";

export default function App() {

  const { user } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[url('/assets/images/login-bg.jpg')] bg-no-repeat bg-cover">
        <div className="fixed inset-0 bg-gradient-to-b from-blue-900/80 to-slate-700 backdrop-blur-sm" />

        <header>
          <Navigation session={user} />
        </header>
        <main className="flex flex-col items-center justify-center my-[10em] mx-5 backdrop-blur-none">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export async function loader({request}: LoaderArgs) {
  downloadPokemonFromAPI();
  
   const session = await getSession(request.headers.get("Cookie"));
   return { user: session.get("userId") };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: cssReset,
    },
    {
      rel: "stylesheet",
      href: appStyles,
    },
  ];
}