import "./SliderBar.scss";
import React, { ReactElement, ReactNode } from "react";

export interface SliderBarProps {
  children: ReactNode;
}

const SliderBar: React.FC<SliderBarProps> = ({
  children,
}: SliderBarProps): ReactElement => {
  return <div className="sliderBar">{children}</div>;
};

export default SliderBar;
