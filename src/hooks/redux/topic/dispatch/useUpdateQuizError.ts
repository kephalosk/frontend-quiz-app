import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setQuizError } from "@/redux/slices/topicSlice.ts";

const useUpdateQuizError: () => (newValue: string | null) => void = (): ((
  newValue: string | null,
) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: string | null): void => {
    dispatch(setQuizError(newValue));
  };
};

export default useUpdateQuizError;
