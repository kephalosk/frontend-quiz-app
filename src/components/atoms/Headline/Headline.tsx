import "./Headline.scss";
import React, { ReactElement } from "react";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";

export interface HeadlineProps {
  title: string;
}

const Headline: React.FC<HeadlineProps> = ({
  title,
}: HeadlineProps): ReactElement => {
  const isDarkModeOn: boolean = useDarkMode();

  return (
    <h1
      className={`headline ${isDarkModeOn && "headline--darkMode"}`}
      aria-label={title}
    >
      {title}
    </h1>
  );
};

export default Headline;
