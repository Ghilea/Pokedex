import { NavLink } from "@remix-run/react";
import { getSession } from "~/api/services/session.server";
import type { LoaderArgs } from "@remix-run/node";

interface Props { 
  session: object;
}

const Navigation = ({ session }: Props) => {

  return (
    <div className="fixed inset-x-0 flex items-center justify-end w-full h-10">
      <ul className="flex flex-row gap-4 mr-5 text-xl text-white">
        <li>
          <NavLink to={"/"}>Hem</NavLink>
        </li>
        <li>
           {session ? (
            <NavLink to={"/logout"}>Logga ut</NavLink>
          ) : (
            <NavLink to={"/login"}>Logga in</NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navigation;