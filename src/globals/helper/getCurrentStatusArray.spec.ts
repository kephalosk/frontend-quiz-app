import { DefaultQuestionStatusArray } from "@/globals/constants/DefaultQuestionStatusArray.ts";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import getCurrentStatusArray from "@/globals/helper/getCurrentStatusArray.ts";

describe("getCurrentStatusArray", () => {
  const statusArrayAnswered: QuestionStatusEnum[] = DefaultQuestionStatusArray;
  statusArrayAnswered[0] = QuestionStatusEnum.RIGHT;
  const statusArraySelected: QuestionStatusEnum[] = DefaultQuestionStatusArray;
  statusArraySelected[0] = QuestionStatusEnum.SELECTED;

  it.each([
    [statusArrayAnswered, true],
    [statusArraySelected, false],
  ])(
    "should return the array for %s if isQuestionAnswered is %s",
    (
      expectedArray: QuestionStatusEnum[],
      isQuestionAnswered: boolean,
    ): void => {
      const result: QuestionStatusEnum[] = getCurrentStatusArray(
        isQuestionAnswered,
        statusArrayAnswered,
        statusArraySelected,
      );

      expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedArray));
    },
  );
});
