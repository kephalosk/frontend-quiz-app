import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setQuestionsAndResetIndexAndScore } from "@/redux/slices/topicSlice.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";

const useUpdateQuestionsAndResetIndexAndScore: () => (
  newValue: EPQuestion[],
) => void = (): ((newValue: EPQuestion[]) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: EPQuestion[]): void => {
    dispatch(setQuestionsAndResetIndexAndScore(newValue));
  };
};

export default useUpdateQuestionsAndResetIndexAndScore;
