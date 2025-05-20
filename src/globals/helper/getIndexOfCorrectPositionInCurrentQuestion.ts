import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";

const getIndexOfCorrectPositionInCurrentQuestion = (
  currentQuestion: EPQuestion,
): number => {
  const options: string[] = currentQuestion.options;
  return options.indexOf(currentQuestion.answer);
};

export default getIndexOfCorrectPositionInCurrentQuestion;
