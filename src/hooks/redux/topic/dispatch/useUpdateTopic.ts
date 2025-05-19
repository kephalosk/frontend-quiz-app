import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { setTopic } from "@/redux/slices/topicSlice.ts";

const useUpdateTopic: () => (newValue: TopicEnum) => void = (): ((
  newValue: TopicEnum,
) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: TopicEnum): void => {
    dispatch(setTopic(newValue));
  };
};

export default useUpdateTopic;
