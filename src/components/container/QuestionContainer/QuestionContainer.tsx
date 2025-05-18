import "./QuestionContainer.scss";
import React from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import ProgressBar from "@/components/atoms/ProgressBar/ProgressBar.tsx";

export interface QuestionContainerProps {
  question: string;
  progressInfo: string;
  progressPerCent: number;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  question,
  progressInfo,
  progressPerCent,
}: QuestionContainerProps) => {
  return (
    <div className="questionContainer">
      <div className="questionContainerHeader">
        <Label type={LabelTypeEnum.SUB_LINE_LABEL} text={progressInfo} />
        <Label type={LabelTypeEnum.QUESTION_LABEL} text={question} />
      </div>
      <ProgressBar progressPerCent={progressPerCent} />
    </div>
  );
};

export default QuestionContainer;
