import "./TitleContainer.scss";
import React from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import Headline from "@/components/atoms/Headline/Headline.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";

export interface TitleContainerProps {
  firstLine: string;
  headline: string;
  subLine: string;
}

const TitleContainer: React.FC<TitleContainerProps> = ({
  firstLine,
  headline,
  subLine,
}: TitleContainerProps) => {
  return (
    <div className="titleContainer">
      <div className="titleContainerHeader">
        <Label type={LabelTypeEnum.HEADLINE_LABEL} text={firstLine} />
        <Headline title={headline} />
      </div>
      <Label type={LabelTypeEnum.SUB_LINE_LABEL} text={subLine} />
    </div>
  );
};

export default TitleContainer;
