import "./ButtonContainer.scss";
import React, { ReactElement, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import SubmitButton from "@/components/atoms/SubmitButton/SubmitButton.tsx";
import QuizButtonContainer from "@/components/container/QuizButtonContainer/QuizButtonContainer.tsx";
import ErrorContainer from "@/components/container/ErrorContainer/ErrorContainer.tsx";
import useIncreaseScore from "@/hooks/redux/topic/dispatch/useIncreaseScore.ts";
import useIncreaseIndex from "@/hooks/redux/topic/dispatch/useIncreaseIndex.ts";
import useIsQuizFinished from "@/hooks/redux/topic/selector/useIsQuizFinished.ts";
import getSubmitButtonText from "@/globals/helper/getSubmitButtonText.ts";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";
import useUpdateIsQuizFinished from "@/hooks/redux/topic/dispatch/useUpdateIsQuizFinished.ts";
import useCurrentIndex from "@/hooks/redux/topic/selector/useCurrentIndex.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";

const ButtonContainer: React.FC = (): ReactElement => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
  const isQuizFinished: boolean = useIsQuizFinished();
  const setIsQuizFinished: (value: boolean) => void = useUpdateIsQuizFinished();

  const submitButtonText: string = getSubmitButtonText(
    isQuizFinished,
    isQuestionAnswered,
  );

  const [isSelectedAnswerCorrect, setIsSelectedAnswerCorrect] =
    useState<boolean>(false);

  const updateSelectionResult: (value: boolean) => void = (
    value: boolean,
  ): void => {
    setIsSelectedAnswerCorrect(value);
    setIsAnswerSelected(true);
  };

  const increaseScore: () => void = useIncreaseScore();
  const currentIndex: number = useCurrentIndex();
  const questions: EPQuestion[] = useQuestions();
  const tryToSubmitAnswer = () => {
    if (!isAnswerSelected) {
      setHasError(true);
      return;
    }
    if (isSelectedAnswerCorrect) {
      increaseScore();
    }
    setIsQuestionAnswered(true);
    if (currentIndex === questions.length - 1) {
      setIsQuizFinished(true);
      console.log("Quiz finished");
    }
  };

  const increaseIndex: () => void = useIncreaseIndex();
  const getNextQuestion: () => void = (): void => {
    increaseIndex();
  };

  const navigate: NavigateFunction = useNavigate();
  const loadResultPage: () => void = (): void => {
    navigate(`${STARTPAGE_PATH}result`);
  };

  const [resetKey, setResetKey] = useState<number>(0);
  const resetStatusArray = () => setResetKey((k) => k + 1);
  const handleSubmit: () => void = (): void => {
    if (isQuizFinished) {
      loadResultPage();
      return;
    }
    if (isQuestionAnswered) {
      getNextQuestion();
      resetStatusArray();
      setIsQuestionAnswered(false);
      setIsAnswerSelected(false);
      return;
    }
    if (!isAnswerSelected) {
      setHasError(true);
      return;
    }
    setHasError(false);
    tryToSubmitAnswer();
  };

  return (
    <div className="buttonContainer">
      <QuizButtonContainer
        isQuestionAnswered={isQuestionAnswered}
        propagateCorrectSelection={(value: boolean) =>
          updateSelectionResult(value)
        }
        resetKey={resetKey}
      />
      <SubmitButton
        text={submitButtonText}
        handleButtonClick={() => handleSubmit()}
      />
      <div className="buttonContainerError">
        {hasError && <ErrorContainer />}
      </div>
    </div>
  );
};

export default ButtonContainer;
