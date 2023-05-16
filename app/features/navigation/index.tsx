import { useState } from "react";
import Hamburger from "./components/hamburger";
import LogoBrand from "./components/logoBrand";
import MenuLinks from "./components/menuLinks";

const Navigation = () => {

  const [isExpanded, setIsExpanded] = useState<Boolean>(true);

  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <LogoBrand />
        <Hamburger onClick={() => setIsExpanded(!isExpanded)} />

        <div className={`${isExpanded && "hidden"} w-full md:block md:w-auto`}>
          <MenuLinks />
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
