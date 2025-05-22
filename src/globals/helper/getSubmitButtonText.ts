import {
  NEXT_QUESTION_BUTTON_TEXT,
  SHOW_RESULTS_BUTTON_TEXT,
  SUBMIT_ANSWER_BUTTON_TEXT,
} from "@/globals/constants/Constants.ts";

const getSubmitButtonText = (
  isQuizFinished: boolean,
  isQuestionAnswered: boolean,
) => {
  if (isQuizFinished) {
    return SHOW_RESULTS_BUTTON_TEXT;
  }
  if (isQuestionAnswered) {
    return NEXT_QUESTION_BUTTON_TEXT;
  }
  return SUBMIT_ANSWER_BUTTON_TEXT;
};

export default getSubmitButtonText;
