import icon from "public/assets/icons/hamburger.svg";

interface Props {
  onClick: any;
}

const Hamburger = ({ onClick, ...restProps }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
      aria-controls="navbar-default"
      aria-expanded="false"
      {...restProps}
    >
      <img src={icon} className="w-10 h-10" alt="hamburger menu" />
    </button>
  );
};

export default Hamburger;
