import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { resetTopic } from "@/redux/slices/topicSlice.ts";

const useResetTopic = (): (() => void) => {
  const dispatch: Dispatch = useDispatch();

  return (): void => {
    dispatch(resetTopic(undefined));
  };
};

export default useResetTopic;
