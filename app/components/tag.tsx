interface Props {
  width?: string;
  fontSize?: string;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const Tag = ({
  width,
  fontSize,
  children,
  className = "",
  color = "bg-blue-500",
  ...restProps
}: Props) => {
  return (
    <div
      className={`w-full max-w-[6em] shadow-xl py-1 px-1 flex justify-center items-center gap-1 rounded-md ${color} text-white ${className} `}
      style={{ width: width, fontSize: fontSize }}
      {...restProps}
    >
      {children && <span className="capitalize">{children}</span>}
    </div>
  );
};

export default Tag;
