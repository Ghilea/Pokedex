interface Props {
  width?: string;
  fontSize?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = ({
  width,
  fontSize,
  icon,
  children,
  ...restProps
}: Props) => {
  return (
    <button
      className={`w-full max-w-[6em] shadow-xl py-3 px-1 flex justify-center items-center gap-1 rounded-md text-black bg-red-700 bg-opacity-50 hover:bg-opacity-75 transition-all`}
      style={{ width: width, fontSize: fontSize }}
      {...restProps}
    >
      {children && <span>{children}</span>}
      {icon}
    </button>
  );
};

export default Button;
