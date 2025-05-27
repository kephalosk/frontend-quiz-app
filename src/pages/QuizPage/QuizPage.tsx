import "./QuizPage.scss";
import React, { ReactElement } from "react";
import QuestionContainer from "@/components/container/QuestionContainer/QuestionContainer.tsx";
import ButtonContainer from "@/components/container/ButtonContainer/ButtonContainer.tsx";
import useCurrentQuestion from "@/hooks/quiz/useCurrentQuestion.ts";
import { CurrentQuestionHook } from "@/globals/models/types/QuizTypes.ts";
import useRelocationForUndefinedTopic from "@/hooks/router/useRelocationForUndefinedTopic.ts";

const QuizPage: React.FC = (): ReactElement => {
  const {
    currentQuestionText,
    progressInfo,
    progressPerCent,
  }: CurrentQuestionHook = useCurrentQuestion();
  useRelocationForUndefinedTopic();

  return (
    <div className="quizPage">
      <QuestionContainer
        question={currentQuestionText}
        progressInfo={progressInfo}
        progressPerCent={progressPerCent}
      />
      <ButtonContainer />
    </div>
  );
};

export default QuizPage;
