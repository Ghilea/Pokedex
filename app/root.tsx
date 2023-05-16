import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import appStyles from "./styles/app.css";
import cssFloating from "./styles/components/floating.css";
import Navigation from "./features/navigation";
import type { LoaderArgs } from "@remix-run/node";
import { getSession } from "./services/session.server";
import BackgroundAnimation from "./utiles/backgroundAnimation";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full min-h-screen relative bg-background-pattern select-none font-Roboto ">
        <BackgroundAnimation />

        <header className="sticky top-0 bg-p-black/70 shadow z-10 w-full mb-16">
          <Navigation />
        </header>
        <main className="flex flex-col items-center justify-start max-w-screen-xl mx-auto px-3 min-h-full py-36">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return { user: session.get("userId") };
}

export function links() {
  return [
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
      href: "https://fonts.cdnfonts.com/css/pokemon-solid",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    },
  ];
}
