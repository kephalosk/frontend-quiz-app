import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import { useMemo } from "react";
import { SCORE_SUB_LINE_LABEL_PREFIX } from "@/globals/constants/Constants.ts";

const useScoreSubLine: () => string = (): string => {
  const questions: EPQuestion[] = useQuestions();
  return useMemo<string>(
    () => `${SCORE_SUB_LINE_LABEL_PREFIX}${questions.length}`,
    [questions.length],
  );
};

export default useScoreSubLine;
