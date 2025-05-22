import { useCallback, useState } from "react";
import useIsQuizFinished from "@/hooks/redux/topic/selector/useIsQuizFinished.ts";
import useIncreaseIndex from "@/hooks/redux/topic/dispatch/useIncreaseIndex.ts";
import {
  QuizSubmitHook,
  ResetKeyHook,
  SubmitAnswerHook,
  UpdateSelectionResultHook,
} from "@/globals/models/types/QuizTypes.ts";
import useResultPage from "@/hooks/router/useResultPage.ts";
import { ResultPageHook } from "@/globals/models/types/RouterTypes.ts";
import useSubmitAnswer from "@/hooks/quiz/subhooks/useSubmitAnswer.ts";
import useResetKey from "@/hooks/quiz/subhooks/useResetKey.ts";
import useUpdateSelectionResult from "@/hooks/quiz/subhooks/useUpdateSelectionResult.ts";

const useQuizSubmit: () => QuizSubmitHook = (): QuizSubmitHook => {
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
  const [isSelectedAnswerCorrect, setIsSelectedAnswerCorrect] =
    useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const { loadResultPage }: ResultPageHook = useResultPage();
  const { resetKey, resetStatusArray }: ResetKeyHook = useResetKey();
  const isQuizFinished: boolean = useIsQuizFinished();
  const increaseIndex: () => void = useIncreaseIndex();
  const { updateSelectionResult }: UpdateSelectionResultHook =
    useUpdateSelectionResult({
      setIsSelectedAnswerCorrect,
      setIsAnswerSelected,
    });

  const { tryToSubmitAnswer }: SubmitAnswerHook = useSubmitAnswer({
    setIsQuestionAnswered,
    setHasError,
    isAnswerSelected,
    isSelectedAnswerCorrect,
  });

  const handleSubmit: () => void = useCallback((): void => {
    if (isQuizFinished) {
      loadResultPage();
      return;
    }
    if (isQuestionAnswered) {
      increaseIndex();
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
  }, [
    increaseIndex,
    isAnswerSelected,
    isQuestionAnswered,
    isQuizFinished,
    loadResultPage,
    resetStatusArray,
    tryToSubmitAnswer,
  ]);

  return {
    handleSubmit,
    updateSelectionResult,
    resetKey,
    isQuestionAnswered,
    isQuizFinished,
    hasError,
  };
};

export default useQuizSubmit;
