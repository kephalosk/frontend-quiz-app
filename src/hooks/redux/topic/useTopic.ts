import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

const useTopic = (): TopicEnum | undefined => {
  return useSelector(
    (state: RootState): TopicEnum | undefined => state.topic.value,
  );
};

export default useTopic;
