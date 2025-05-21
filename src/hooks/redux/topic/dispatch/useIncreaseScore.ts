import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { increaseScore } from "@/redux/slices/topicSlice.ts";

const useIncreaseScore: () => () => void = (): (() => void) => {
  const dispatch: Dispatch = useDispatch();

  return (): void => {
    dispatch(increaseScore());
  };
};

export default useIncreaseScore;
