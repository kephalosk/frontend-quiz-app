import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { increaseScore } from "@/redux/slices/topicSlice.ts";

const useAnswerQuestion: () => (newValue: {
  correct: boolean;
}) => void = (): ((newValue: { correct: boolean }) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: { correct: boolean }): void => {
    dispatch(increaseScore(newValue));
  };
};

export default useAnswerQuestion;
