import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { resetTopicValue } from "@/redux/slices/topicSlice.ts";

const useResetTopic = (): (() => void) => {
  const dispatch: Dispatch = useDispatch();

  return (): void => {
    dispatch(resetTopicValue(undefined));
  };
};

export default useResetTopic;
