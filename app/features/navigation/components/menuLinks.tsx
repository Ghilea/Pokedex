import { NavLink, useLoaderData } from "@remix-run/react";
import Notification from "~/components/notification/notification";

const MenuLinks = () => {

  const { user } = useLoaderData();

  const linkStyle =
    "block py-2 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent";

  return (
    <ul className="relative flex flex-col p-4 mt-4 font-medium md:p-0 md:flex-row md:space-x-8 md:mt-0">
      <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
        <NavLink aria-current="page" to={"/"}>
          Hem
        </NavLink>
      </li>

      {user ? (
        <>
          <Notification />
          <li className={linkStyle}>
            <NavLink to={"/logout"}>Logga ut</NavLink>
          </li>
        </>
      ) : (
        <>
          <li className={linkStyle}>
            <NavLink to={"/createAccount"}>Registrera</NavLink>
          </li>

          <li className={linkStyle}>
            <NavLink to={"/login"}>Logga in</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default MenuLinks;
