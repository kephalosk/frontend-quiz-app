import "./SliderBarAdjuster.scss";
import React, { ReactElement } from "react";

export interface SliderBarAdjusterProps {
  isClicked: boolean;
}

const SliderBarAdjuster: React.FC<SliderBarAdjusterProps> = ({
  isClicked,
}: SliderBarAdjusterProps): ReactElement => {
  return (
    <div className={`sliderBarAdjuster ${isClicked ? "clicked" : ""}`}></div>
  );
};

export default SliderBarAdjuster;
