import { Background } from "~/types/color";
import { getPercentColor } from "~/utiles/getPercentsColor";

interface ProgressBarProps {
  progress: number;
  amount: number;
  rotate?: boolean;
}

export const ProgressBar = ({
  progress,
  amount,
  rotate = false,
}: ProgressBarProps) => {
  const percent = Number(
    Math.floor(100 * ((progress - amount) / progress)).toFixed(2)
  );
  const barWithBg = getPercentColor(percent, true);
  const barwithoutBg = getPercentColor(percent, false);

  return (
    <div
      className={`${
        rotate &&
        `${Background.GREENLIGHT} -rotate-90 portrait:scale-[4] portrait:h-[2em]`
      } ${
        !rotate && `${barWithBg} portrait:h-12`
      } rounded-[3em] w-full h-6 overflow-hidden`}
    >
      <div
        className={`${
          rotate && Background.GREEN
        } relative landscape:rounded-[3em] ${
          !rotate && barwithoutBg
        } w-full h-6 portrait:h-full max-w-full`}
        style={{
          width: `${percent}%`,
        }}
      ></div>
    </div>
  );
};
