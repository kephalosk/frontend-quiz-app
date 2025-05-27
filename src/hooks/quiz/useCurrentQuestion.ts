import { useMemo } from "react";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import useCurrentIndex from "@/hooks/redux/topic/selector/useCurrentIndex.ts";
import useProgressInfo from "@/hooks/quiz/useProgressInfo.ts";
import useProgressPerCent from "@/hooks/quiz/useProgressPerCent.ts";
import { CurrentQuestionHook } from "@/globals/models/types/QuizTypes.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";

const useCurrentQuestion: () => CurrentQuestionHook =
  (): CurrentQuestionHook => {
    const questions: EPQuestion[] = useQuestions();
    const currentIndex: number = useCurrentIndex();

    const progressInfo: string = useProgressInfo({
      currentIndex,
      totalQuestions: questions.length,
    });

    const progressPerCent: number = useProgressPerCent({
      currentIndex,
      totalQuestions: questions.length,
    });

    const currentQuestionText: string = useMemo(() => {
      if (questions.length === 0) {
        return EMPTY_STRING;
      } else {
        return questions[currentIndex].question;
      }
    }, [currentIndex, questions]);

    return { currentQuestionText, progressInfo, progressPerCent };
  };

export default useCurrentQuestion;
