import { useState } from "react";
import { QuestionAnsweredHook } from "@/globals/models/types/QuizTypes.ts";

const useQuestionAnswered = (): QuestionAnsweredHook => {
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);

  return { isQuestionAnswered, setIsQuestionAnswered };
};

export default useQuestionAnswered;
