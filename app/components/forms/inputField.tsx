import { useEffect, useRef, useState } from "react";

interface Props {
  isError?: boolean;
  value?: any;
  onChange?: any;
  name: string;
  label?: string | null;
  type?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
}
const InputField = ({
  isError = false,
  value,
  onChange,
  name,
  label = null,
  type = "text",
  className = "",
  placeholder = "",
  defaultValue = "",
  required,
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
    <div className="flex flex-col items-center justify-center w-full gap-5">
      {label && (
        <label htmlFor={name} className="w-full text-xl" {...restProps}></label>
      )}
      <div
        className="relative w-full bg-white shadow-xl bg-opacity-70 rounded-3xl backdrop-blur-md"
        onClick={handleClick}
        ref={ref}
      >
        <div className="flex items-center w-full">
          <input
            required={required}
            placeholder={placeholder}
            type={type}
            id={name}
            name={name}
            className={`flex items-center rounded-3xl p-5 border-none w-full ${classes} ${className}`}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            autoComplete="off"
            {...restProps}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;
