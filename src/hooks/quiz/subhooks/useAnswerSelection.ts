import { useState } from "react";
import { AnswerSelectionHook } from "@/globals/models/types/QuizTypes.ts";

const useAnswerSelection = (): AnswerSelectionHook => {
  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);

  return { isAnswerSelected, setIsAnswerSelected };
};

export default useAnswerSelection;
