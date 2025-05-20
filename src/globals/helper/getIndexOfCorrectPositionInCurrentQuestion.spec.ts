import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import getIndexOfCorrectPositionInCurrentQuestion from "@/globals/helper/getIndexOfCorrectPositionInCurrentQuestion.ts";

describe("getIndexOfCorrectPositionInCurrentQuestion", (): void => {
  it("returns index of correct position in current question", (): void => {
    const expectedIndex: number = 1;
    const epQuestion: EPQuestion = {
      question: "Question",
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option B",
    };

    const receivedIndex: number =
      getIndexOfCorrectPositionInCurrentQuestion(epQuestion);

    expect(receivedIndex).toEqual(expectedIndex);
  });
});
