import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";

const getCurrentStatusArray = (
  isQuestionAnswered: boolean,
  statusArrayAnswered: QuestionStatusEnum[],
  statusArraySelected: QuestionStatusEnum[],
) => {
  return isQuestionAnswered ? statusArrayAnswered : statusArraySelected;
};

export default getCurrentStatusArray;
