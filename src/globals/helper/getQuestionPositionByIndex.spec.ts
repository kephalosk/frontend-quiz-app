import getQuestionPositionByIndex from "@/globals/helper/getQuestionPositionByIndex.ts";
import { INDEX_ERROR_MESSAGE } from "@/globals/constants/ErrorMessages.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";

describe("getQuestionPositionByIndex", (): void => {
  it.each([
    [QuestionPositionEnum.A, 0],
    [QuestionPositionEnum.B, 1],
    [QuestionPositionEnum.C, 2],
    [QuestionPositionEnum.D, 3],
  ])(
    "returns %s for index %s",
    (position: QuestionPositionEnum, index: number): void => {
      const output: QuestionPositionEnum = getQuestionPositionByIndex(index);

      expect(output).toEqual(position);
    },
  );

  it("throws error if index is out of range", (): void => {
    const inputOutOfRange: number = -1;

    expect(() => getQuestionPositionByIndex(inputOutOfRange)).toThrow(
      new Error(`${INDEX_ERROR_MESSAGE}: ${inputOutOfRange}`),
    );
  });
});
