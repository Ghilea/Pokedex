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
import cssFloating from "./styles/components/floating.css";
import Navigation from "./features/navigation";
import { downloadPokemonFromAPI } from "~/api/crud";
import type { LoaderArgs } from "@remix-run/node";
import { getSession } from "./api/services/session.server";
import BackgroundAnimation from "./components/backgroundAnimation";

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
      <body className="relative bg-gradient-to-b from-primary to-primary-light">
        <header>
          <Navigation session={user} />
        </header>
        <main className="flex flex-col items-center justify-center my-[10em] mx-5">
          <Outlet />
        </main>
        <BackgroundAnimation />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export async function loader({ request }: LoaderArgs) {
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
      href: cssFloating,
    },
    {
      rel: "stylesheet",
      href: appStyles,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.cdnfonts.com/css/pokemon-solid",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    },
  ];
}
