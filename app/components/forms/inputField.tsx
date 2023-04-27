import { useEffect, useRef, useState } from "react";

interface Props {
  isError?: boolean;
  value?: any;
  handleChange?: any;
  children: React.ReactNode;
  name: string;
}
const InputField = ({
  isError = false,
  value,
  handleChange,
  children,
  name,
  ...restProps
}: Props) => {
  const ref = useRef<any | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleClick = () => {
    ref.current.focus();
  };

  useEffect(() => {
    setError(isError);
  }, [isError]);

  let classes = [];
  if (error) classes.push("shadow-xl");

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 px-16">
      <label htmlFor={name} className="w-full text-xl" {...restProps}>
        {children}
      </label>
      <div
        className="relative w-full shadow-xl bg-opacity-30 rounded-3xl backdrop-blur-md"
        onClick={handleClick}
        ref={ref}
      >
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            className={`flex items-center rounded-3xl p-5 border-none w-full ${classes}`}
            value={value}
            onChange={handleChange}
            {...restProps}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;
