import "./QuizButton.scss";
import React, { ReactElement } from "react";
import { QUIZ_BUTTON_ARIA_LABEL_PREFIX } from "@/globals/constants/Constants.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";
import useQuizButtonIcon from "@/hooks/quizButton/useQuizButtonIcon.ts";
import useQuizButtonBehavior from "@/hooks/quizButton/useQuizButtonBehavior.ts";
import {
  QuizButtonBehaviorHook,
  QuizButtonClassesHook,
  QuizButtonIconHook,
} from "@/globals/models/types/QuizButtonTypes.ts";
import useQuizButtonClasses from "@/hooks/quizButton/useQuizButtonClasses.ts";

export interface QuizButtonProps {
  text: string;
  position: QuestionPositionEnum;
  status: QuestionStatusEnum;
  propagateAnswer: (
    answer: string,
    positionClicked: QuestionPositionEnum,
  ) => void;
  isDisabled: boolean;
}

const QuizButton: React.FC<QuizButtonProps> = React.memo(
  ({
    text,
    position,
    status,
    propagateAnswer,
    isDisabled,
  }: QuizButtonProps): ReactElement => {
    const handleButtonClick = (): void => {
      propagateAnswer(text, position);
    };

    const { ref, isClickable, buttonEventProps }: QuizButtonBehaviorHook =
      useQuizButtonBehavior(handleButtonClick, status, isDisabled);

    const { showIcon, src, alt }: QuizButtonIconHook =
      useQuizButtonIcon(status);

    const isDarkModeOn: boolean = useDarkMode();

    const {
      quizButtonClasses,
      quizButtonPositionClasses,
    }: QuizButtonClassesHook = useQuizButtonClasses(
      isDarkModeOn,
      isDisabled,
      status,
    );

    return (
      <button
        ref={ref}
        className={quizButtonClasses}
        {...buttonEventProps}
        type="button"
        aria-label={`${QUIZ_BUTTON_ARIA_LABEL_PREFIX}${text}`}
        aria-disabled={!isClickable}
        tabIndex={isClickable ? 0 : -1}
        disabled={!isClickable}
      >
        <div className="quizButtonWrapper">
          <div className={quizButtonPositionClasses}>{position}</div>
          <Label
            className="quizButtonText"
            type={LabelTypeEnum.QUIZ_BUTTON_LABEL}
            text={text}
          />
        </div>
        {showIcon && (
          <img
            className="quizButtonIcon"
            src={src}
            alt={alt}
            aria-hidden={true}
          />
        )}
      </button>
    );
  },
);

export default QuizButton;
