import "./ProgressBar.scss";
import React, { ReactElement } from "react";
import useDarkMode from "@/hooks/redux/darkMode/useDarkMode.ts";

export interface ProgressBarProps {
  progressPerCent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPerCent,
}): ReactElement => {
  const isDarkModeOn: boolean = useDarkMode();

  return (
    <div
      className={`progressBar progressBar--${isDarkModeOn ? "darkMode" : "lightMode"}`}
    >
      <div
        className="progressBarValue"
        style={{ width: `calc(${progressPerCent}% - 8px)` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
