interface Props {
  width?: string;
  fontSize?: string;
  icon?: string | null;
  children: React.ReactNode;
  className?: string;
  onClick?: any;
}

const Button = ({
  width,
  fontSize,
  icon,
  children,
  className = "",
  onClick,
  ...restProps
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`w-full max-w-[6em] shadow-xl py-3 px-1 flex justify-center items-center gap-1 rounded-md text-black bg-red-700 bg-opacity-50 hover:bg-opacity-75 transition-all ${className}}`}
      style={{ width: width, fontSize: fontSize }}
      {...restProps}
    >
      {children && <span>{children}</span>}
      {icon && <img className="w-5 h-5" src={icon} alt="" />}
    </button>
  );
};

export default Button;
