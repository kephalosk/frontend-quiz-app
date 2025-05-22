import "./ButtonContainer.scss";
import React, { ReactElement } from "react";
import SubmitButton from "@/components/atoms/SubmitButton/SubmitButton.tsx";
import QuizButtonContainer from "@/components/container/QuizButtonContainer/QuizButtonContainer.tsx";
import ErrorContainer from "@/components/container/ErrorContainer/ErrorContainer.tsx";
import { QuizSubmitHook } from "@/globals/models/types/QuizTypes.ts";
import useQuizSubmit from "@/hooks/quiz/useQuizSubmit.ts";
import getSubmitButtonText from "@/globals/helper/getSubmitButtonText.ts";

const ButtonContainer: React.FC = (): ReactElement => {
  const {
    handleSubmit,
    updateSelectionResult,
    resetKey,
    isQuestionAnswered,
    isQuizFinished,
    hasError,
  }: QuizSubmitHook = useQuizSubmit();

  const submitButtonText: string = getSubmitButtonText(
    isQuizFinished,
    isQuestionAnswered,
  );

  return (
    <div className="buttonContainer">
      <QuizButtonContainer
        isQuestionAnswered={isQuestionAnswered}
        propagateCorrectSelection={updateSelectionResult}
        resetKey={resetKey}
      />
      <SubmitButton text={submitButtonText} handleButtonClick={handleSubmit} />
      <div className="buttonContainerError">
        {hasError && <ErrorContainer />}
      </div>
    </div>
  );
};

export default ButtonContainer;
