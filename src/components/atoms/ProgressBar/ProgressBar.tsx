import "./ProgressBar.scss";
import React, { ReactElement } from "react";

export interface ProgressBarProps {
  progressPerCent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPerCent,
}): ReactElement => {
  return (
    <div className="progressBar">
      <div
        className="progressBarValue"
        style={{ width: `calc(${progressPerCent}% - 8px)` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
