import clsx from "clsx";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import { QuizButtonClassesHook } from "@/globals/models/types/QuizButtonTypes.ts";

const useQuizButtonClasses = (
  isDarkModeOn: boolean,
  isDisabled: boolean,
  status: QuestionStatusEnum,
): QuizButtonClassesHook => {
  const baseQuizButton: string = "quizButton";
  const variantQuizButton: string = `${baseQuizButton}__${status}`;
  const modeQuizButton: string = isDarkModeOn
    ? `${variantQuizButton}--darkMode`
    : `${variantQuizButton}--lightMode`;
  const quizButtonClasses: string = clsx(
    baseQuizButton,
    variantQuizButton,
    modeQuizButton,
    { disabled: isDisabled },
  );

  const baseQuizButtonPosition: string = "quizButtonPosition";
  const variantQuizButtonPosition: string = `${baseQuizButtonPosition}__${status}`;
  const quizButtonPositionClasses: string = clsx(
    baseQuizButtonPosition,
    variantQuizButtonPosition,
  );

  return { quizButtonClasses, quizButtonPositionClasses };
};

export default useQuizButtonClasses;
