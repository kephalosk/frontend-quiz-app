import { useCallback, useState } from "react";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import { DefaultQuestionStatusArray } from "@/globals/constants/DefaultQuestionStatusArray.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { UpdateSelectionHook } from "@/globals/models/types/QuizTypes.ts";
import getIndexOfCorrectPositionInCurrentQuestion from "@/globals/helper/getIndexOfCorrectPositionInCurrentQuestion.ts";
import getIndexByQuestionPosition from "@/globals/helper/getIndexByQuestionPosition.ts";

const useUpdateSelection = (
  currentQuestion: EPQuestion,
  propagateCorrectSelection: (value: boolean) => void,
): UpdateSelectionHook => {
  const [statusArraySelected, setStatusArraySelected] = useState<
    QuestionStatusEnum[]
  >(DefaultQuestionStatusArray);
  const [statusArrayAnswered, setStatusArrayAnswered] = useState<
    QuestionStatusEnum[]
  >(DefaultQuestionStatusArray);

  const updateStatusArraySelected: (indexClicked: number) => void = useCallback(
    (indexClicked: number): void => {
      const newStatusArraySelected: QuestionStatusEnum[] = [
        ...DefaultQuestionStatusArray,
      ];
      newStatusArraySelected[indexClicked] = QuestionStatusEnum.SELECTED;
      setStatusArraySelected(newStatusArraySelected);
    },
    [],
  );

  const updateStatusArrayAnswered: (
    answer: string,
    indexClicked: number,
  ) => void = useCallback(
    (answer: string, indexClicked: number): void => {
      const newStatusArrayAnswered: QuestionStatusEnum[] = [
        ...DefaultQuestionStatusArray,
      ];
      if (answer === currentQuestion.answer) {
        newStatusArrayAnswered[indexClicked] = QuestionStatusEnum.RIGHT;
        propagateCorrectSelection(true);
      } else {
        newStatusArrayAnswered[indexClicked] = QuestionStatusEnum.WRONG;
        const indexCorrected =
          getIndexOfCorrectPositionInCurrentQuestion(currentQuestion);
        newStatusArrayAnswered[indexCorrected] = QuestionStatusEnum.CORRECTED;
        propagateCorrectSelection(false);
      }
      setStatusArrayAnswered(newStatusArrayAnswered);
    },
    [currentQuestion, propagateCorrectSelection],
  );

  const handleSelection = useCallback(
    (answer: string, positionClicked: QuestionPositionEnum): void => {
      const indexClicked: number = getIndexByQuestionPosition(positionClicked);

      updateStatusArraySelected(indexClicked);

      updateStatusArrayAnswered(answer, indexClicked);
    },
    [updateStatusArrayAnswered, updateStatusArraySelected],
  );

  return { statusArraySelected, statusArrayAnswered, handleSelection };
};

export default useUpdateSelection;
