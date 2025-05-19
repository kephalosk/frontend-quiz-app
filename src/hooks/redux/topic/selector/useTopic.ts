import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

const useTopic: () => TopicEnum | null = (): TopicEnum | null => {
  return useSelector((state: RootState): TopicEnum | null => state.topic.topic);
};

export default useTopic;
