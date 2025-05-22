import {
  NEXT_QUESTION_BUTTON_TEXT,
  SHOW_RESULTS_BUTTON_TEXT,
  SUBMIT_ANSWER_BUTTON_TEXT,
} from "@/globals/constants/Constants.ts";
import getSubmitButtonText from "@/globals/helper/getSubmitButtonText.ts";

describe("getSubmitButtonText", (): void => {
  it.each([
    [true, true, SHOW_RESULTS_BUTTON_TEXT],
    [true, false, SHOW_RESULTS_BUTTON_TEXT],
    [false, true, NEXT_QUESTION_BUTTON_TEXT],
    [false, false, SUBMIT_ANSWER_BUTTON_TEXT],
  ])(
    "returns correct text if isQuizFinished is %s and isQuestionAnswered is %s",
    (
      isQuizFinished: boolean,
      isQuestionAnswered: boolean,
      text: string,
    ): void => {
      const result: string = getSubmitButtonText(
        isQuizFinished,
        isQuestionAnswered,
      );

      expect(result).toEqual(text);
    },
  );
});
