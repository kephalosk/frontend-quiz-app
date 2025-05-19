import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setQuizStatus } from "@/redux/slices/topicSlice.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";

const useUpdateQuizStatus: () => (newValue: LoadingStateEnum) => void = (): ((
  newValue: LoadingStateEnum,
) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: LoadingStateEnum): void => {
    dispatch(setQuizStatus(newValue));
  };
};

export default useUpdateQuizStatus;
