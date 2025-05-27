import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import { QuizButtonHandleButtonClickHook } from "@/globals/models/types/QuizButtonTypes.ts";

const useQuizButtonHandleButtonClick = (
  propagateAnswer: (
    answer: string,
    positionClicked: QuestionPositionEnum,
  ) => void,
  text: string,
  position: QuestionPositionEnum,
): QuizButtonHandleButtonClickHook => {
  const handleButtonClick: () => void = (): void => {
    propagateAnswer(text, position);
  };

  return { handleButtonClick };
};

export default useQuizButtonHandleButtonClick;
