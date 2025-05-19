import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { answerQuestion } from "@/redux/slices/topicSlice.ts";

const useAnswerQuestion: () => (newValue: {
  correct: boolean;
}) => void = (): ((newValue: { correct: boolean }) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: { correct: boolean }): void => {
    dispatch(answerQuestion(newValue));
  };
};

export default useAnswerQuestion;
