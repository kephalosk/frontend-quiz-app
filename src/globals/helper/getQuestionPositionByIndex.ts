import { INDEX_ERROR_MESSAGE } from "@/globals/constants/ErrorMessages.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";

const getQuestionPositionByIndex: (index: number) => QuestionPositionEnum = (
  index: number,
): QuestionPositionEnum => {
  switch (index) {
    case 0:
      return QuestionPositionEnum.A;
    case 1:
      return QuestionPositionEnum.B;
    case 2:
      return QuestionPositionEnum.C;
    case 3:
      return QuestionPositionEnum.D;
    default:
      throw new Error(`${INDEX_ERROR_MESSAGE}: ${index}`);
  }
};

export default getQuestionPositionByIndex;
