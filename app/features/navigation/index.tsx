import { NavLink } from "@remix-run/react";
import logo from "public/assets/icons/gym.svg";
import hamburger from "public/assets/icons/hamburger.svg";
import { useState } from "react";
import Notification from "~/components/notifications";

interface Props {
  session: object;
}

const Navigation = ({ session }: Props) => {

  const [isExpanded, setIsExpanded] = useState<Boolean>(true);
  
  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <NavLink to="/" className="flex items-center hover:opacity-70">
          <img src={logo} className="h-8 mr-3" alt="pokedex logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Pokedex
          </span>
        </NavLink>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <img src={hamburger} className="w-10 h-10" alt="hamburger menu" />
        </button>
        <div className={`${isExpanded && "hidden"} w-full md:block md:w-auto`}>
          <ul className="relative flex flex-col p-4 mt-4 font-medium md:p-0 md:flex-row md:space-x-8 md:mt-0">
            <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
              <NavLink aria-current="page" to={"/"}>
                Hem
              </NavLink>
            </li>
            <li>
              <Notification session={session} />
            </li>
            <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {session ? (
                <NavLink to={"/logout"}>Logga ut</NavLink>
              ) : (
                <NavLink to={"/login"}>Logga in</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
