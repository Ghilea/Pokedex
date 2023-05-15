import { Background } from "~/types/color";
import { getPercentColor } from "~/utiles/getPercentsColor";

interface ProgressBarProps {
  progress: number;
  amount: number;
  rotate?: boolean;
  reverse?: boolean;
  name?: string;
}

export const ProgressBar = ({
  progress,
  amount,
  name,
  rotate = false,
  reverse = false,
}: ProgressBarProps) => {
  const percent = Number(Math.floor(100 * (amount / progress)).toFixed(2));
  const reversePercent = Number(
    Math.floor(100 - 100 * (amount / progress)).toFixed(2)
  );
  const barWithBg = getPercentColor(percent, true);
  const barwithoutBg = getPercentColor(percent, false);

  return (
    <div
      className={`${
        rotate &&
        `${Background.GREENLIGHT} -rotate-90 portrait:scale-[4] portrait:h-[2em]`
      } ${!rotate && `${barWithBg}`} rounded-[3em] w-full h-6 overflow-hidden`}
    >
      <div
        className={`${
          rotate && Background.GREEN
        } relative landscape:rounded-[3em] ${
          !rotate && barwithoutBg
        } w-full h-6 portrait:h-full max-w-full flex items-center`}
        style={{
          width: `${reverse ? reversePercent : percent}%`,
        }}
      >
        <p className="relative capitalize left-2">
          {name && name}{" "}
          <span className="text-sm">
            ( {amount} / {progress} )
          </span>
        </p>
      </div>
    </div>
  );
};
