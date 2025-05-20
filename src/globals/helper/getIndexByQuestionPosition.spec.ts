import { QUESTION_POSITION_ERROR_MESSAGE } from "@/globals/constants/ErrorMessages.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import getIndexByQuestionPosition from "@/globals/helper/getIndexByQuestionPosition.ts";

describe("getIndexByQuestionPosition", (): void => {
  it.each([
    [0, QuestionPositionEnum.A],
    [1, QuestionPositionEnum.B],
    [2, QuestionPositionEnum.C],
    [3, QuestionPositionEnum.D],
  ])(
    "returns %s for index %s",
    (index: number, position: QuestionPositionEnum): void => {
      const output: number = getIndexByQuestionPosition(position);

      expect(output).toEqual(index);
    },
  );

  it("throws error if questionPosition is unknown", (): void => {
    const inputUnknown: QuestionPositionEnum =
      "unknown" as QuestionPositionEnum;

    expect(() => getIndexByQuestionPosition(inputUnknown)).toThrow(
      new Error(`${QUESTION_POSITION_ERROR_MESSAGE}: ${inputUnknown}`),
    );
  });
});
