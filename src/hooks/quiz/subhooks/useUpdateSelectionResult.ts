import React, { useCallback } from "react";
import { UpdateSelectionResultHook } from "@/globals/models/types/QuizTypes.ts";

export interface useUpdateSelectionResultProps {
  setIsSelectedAnswerCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnswerSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const useUpdateSelectionResult: (
  arg0: useUpdateSelectionResultProps,
) => UpdateSelectionResultHook = ({
  setIsSelectedAnswerCorrect,
  setIsAnswerSelected,
}: useUpdateSelectionResultProps): UpdateSelectionResultHook => {
  const updateSelectionResult: (value: boolean) => void = useCallback(
    (value: boolean): void => {
      setIsSelectedAnswerCorrect(value);
      setIsAnswerSelected(true);
    },
    [setIsAnswerSelected, setIsSelectedAnswerCorrect],
  );

  return { updateSelectionResult };
};

export default useUpdateSelectionResult;
