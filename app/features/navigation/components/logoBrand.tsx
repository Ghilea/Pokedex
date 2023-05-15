import { NavLink } from "@remix-run/react";
import icon from "public/assets/icons/gym.svg";

const LogoBrand = () => {
  return (
    <NavLink to="/" className="flex items-center hover:opacity-70">
      <img src={icon} className="h-8 mr-3" alt="pokedex logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Pokedex
      </span>
    </NavLink>
  );
};

export default LogoBrand;
