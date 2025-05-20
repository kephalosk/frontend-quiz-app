import { QUESTION_POSITION_ERROR_MESSAGE } from "@/globals/constants/ErrorMessages.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";

const getIndexByQuestionPosition: (
  questionPosition: QuestionPositionEnum,
) => number = (questionPosition: QuestionPositionEnum): number => {
  switch (questionPosition) {
    case QuestionPositionEnum.A:
      return 0;
    case QuestionPositionEnum.B:
      return 1;
    case QuestionPositionEnum.C:
      return 2;
    case QuestionPositionEnum.D:
      return 3;
    default:
      throw new Error(
        `${QUESTION_POSITION_ERROR_MESSAGE}: ${questionPosition}`,
      );
  }
};

export default getIndexByQuestionPosition;
