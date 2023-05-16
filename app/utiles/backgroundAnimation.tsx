import icon from "public/assets/icons/pokeBall.svg";

const BackgroundAnimation = () => {

  const amount: number = 10;
  return (
    <ul className="absolute inset-0 w-full h-full overflow-hidden circles">
      {[...Array(amount)].map((x, index) => (
        <li
          className="flex justify-center items-center absolute w-[20px] h-[20px] bottom-[-150px] list-none bg-p-grey-light/20"
          key={"backgroundBubble" + index}
        >
          <img className="opacity-50 w-[70%] h-auto" src={icon} alt="" />
        </li>
      ))}
    </ul>
  );
};

export default BackgroundAnimation;
