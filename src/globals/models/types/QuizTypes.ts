import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";

export type UpdateSelectionHook = {
  statusArraySelected: QuestionStatusEnum[];
  statusArrayAnswered: QuestionStatusEnum[];
  handleSelection: (
    answer: string,
    positionClicked: QuestionPositionEnum,
  ) => void;
};
