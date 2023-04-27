import { NavLink } from "@remix-run/react";

const Navigation = () => {
  return (
    <div className="fixed inset-x-0 flex items-center justify-end w-full h-10">
      <ul className="flex flex-row gap-4 mr-5 text-xl text-white">
        <li>
          <NavLink to={"/"}>Hem</NavLink>
        </li>
        <li>
          <NavLink to={"/login"}>Logga in</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
