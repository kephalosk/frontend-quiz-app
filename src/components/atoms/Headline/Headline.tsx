import "./Headline.scss";
import React, { ReactElement } from "react";

export interface HeadlineProps {
  title: string;
}

const Headline: React.FC<HeadlineProps> = ({
  title,
}: HeadlineProps): ReactElement => {
  return (
    <h1 className="headline" aria-label={title}>
      {title}
    </h1>
  );
};

export default Headline;
