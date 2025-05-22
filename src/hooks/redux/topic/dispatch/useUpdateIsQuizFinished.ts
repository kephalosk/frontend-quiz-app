import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setIsQuizFinished } from "@/redux/slices/topicSlice.ts";

const useUpdateIsQuizFinished: () => (newValue: boolean) => void = (): ((
  newValue: boolean,
) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: boolean): void => {
    dispatch(setIsQuizFinished(newValue));
  };
};

export default useUpdateIsQuizFinished;
