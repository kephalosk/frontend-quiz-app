import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { increaseIndex } from "@/redux/slices/topicSlice.ts";

const useIncreaseIndex: () => () => void = (): (() => void) => {
  const dispatch: Dispatch = useDispatch();

  return (): void => {
    dispatch(increaseIndex());
  };
};

export default useIncreaseIndex;
