import React, { useCallback } from "react";
import useCurrentIndex from "@/hooks/redux/topic/selector/useCurrentIndex.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import useIncreaseScore from "@/hooks/redux/topic/dispatch/useIncreaseScore.ts";
import useUpdateIsQuizFinished from "@/hooks/redux/topic/dispatch/useUpdateIsQuizFinished.ts";
import { SubmitAnswerHook } from "@/globals/models/types/QuizTypes.ts";

export interface useSubmitAnswerProps {
  setIsQuestionAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerSelected: boolean;
  isSelectedAnswerCorrect: boolean;
}

const useSubmitAnswer = ({
  setIsQuestionAnswered,
  setHasError,
  isAnswerSelected,
  isSelectedAnswerCorrect,
}: useSubmitAnswerProps): SubmitAnswerHook => {
  const currentIndex: number = useCurrentIndex();
  const questions: EPQuestion[] = useQuestions();

  const increaseScore: () => void = useIncreaseScore();
  const setIsQuizFinished: (value: boolean) => void = useUpdateIsQuizFinished();

  const tryToSubmitAnswer = useCallback(() => {
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
    }
  }, [
    currentIndex,
    increaseScore,
    isAnswerSelected,
    isSelectedAnswerCorrect,
    questions.length,
    setHasError,
    setIsQuestionAnswered,
    setIsQuizFinished,
  ]);

  return { tryToSubmitAnswer };
};

export default useSubmitAnswer;
