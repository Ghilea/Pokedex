interface Props {
  width?: string;
  fontSize?: string;
  icon?: string | null;
  children: React.ReactNode;
  className?: string;
  onClick?: any;
  value?: string | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  name?: string | undefined;
  disabled?: boolean;
}

const Button = ({
  name,
  type,
  width,
  fontSize,
  icon,
  children,
  className = "",
  onClick,
  value,
  disabled = false,
  ...restProps
}: Props) => {
  return (
    <button
      disabled={disabled}
      name={name}
      value={value}
      type={type}
      onClick={onClick}
      className={`${className} w-full max-w-[6em] shadow-xl py-2 px-3 flex justify-center items-center gap-1 rounded-md text-white bg-blue-500 bg-opacity-50 hover:bg-opacity-75 transition-all`}
      style={{ width: width, fontSize: fontSize }}
      {...restProps}
    >
      {children && <span>{children}</span>}
      {icon && <img className="w-5 h-5" src={icon} alt="" />}
    </button>
  );
};

export default Button;
