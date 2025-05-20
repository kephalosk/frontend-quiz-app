import "./QuizButtonContainer.scss";
import React, { ReactElement } from "react";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import QuizButton from "@/components/container/QuizButton/QuizButton.tsx";
import useCurrentIndex from "@/hooks/redux/topic/selector/useCurrentIndex.ts";
import getQuestionPositionByIndex from "@/globals/helper/getQuestionPositionByIndex.ts";
import { UpdateSelectionHook } from "@/globals/models/types/QuizTypes.ts";
import useUpdateSelection from "@/hooks/quiz/useUpdateSelection.ts";
import getCurrentStatusArray from "@/hooks/quiz/getCurrentStatusArray.ts";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";

export interface QuizButtonContainerProps {
  isQuestionAnswered: boolean;
  propagateCorrectSelection: (IsSelectedAnswerCorrect: boolean) => void;
}

const QuizButtonContainer: React.FC<QuizButtonContainerProps> = ({
  isQuestionAnswered,
  propagateCorrectSelection,
}: QuizButtonContainerProps): ReactElement => {
  const questions: EPQuestion[] = useQuestions();
  const currentIndex: number = useCurrentIndex();
  const currentQuestion: EPQuestion = questions[currentIndex];
  const {
    statusArraySelected,
    statusArrayAnswered,
    handleSelection,
  }: UpdateSelectionHook = useUpdateSelection(
    currentQuestion,
    propagateCorrectSelection,
  );
  const currentStatusArray: QuestionStatusEnum[] = getCurrentStatusArray(
    isQuestionAnswered,
    statusArrayAnswered,
    statusArraySelected,
  );

  return (
    <div className="quizButtonContainer">
      {currentQuestion &&
        currentQuestion.options &&
        currentQuestion.options.map(
          (question: string, index: number): ReactElement => (
            <QuizButton
              key={index}
              text={question}
              position={getQuestionPositionByIndex(index)}
              status={currentStatusArray[index]}
              propagateAnswer={handleSelection}
              isDisabled={isQuestionAnswered}
            />
          ),
        )}
    </div>
  );
};

export default QuizButtonContainer;
