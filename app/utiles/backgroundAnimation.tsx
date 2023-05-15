const BackgroundAnimation = () => {

  const amount: number = 10;
  return (
    <ul className="fixed inset-0 w-full h-full overflow-hidden circles">
      
      {[...Array(amount)].map((x, index) =>
        <li key={'backgroundBubble' + index}></li>
      )}
    </ul>
  );
};

export default BackgroundAnimation;
