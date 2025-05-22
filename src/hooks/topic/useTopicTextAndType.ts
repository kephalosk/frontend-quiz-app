import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import {
  ACCESSIBILITY_TEXT,
  CSS_TEXT,
  HTML_TEXT,
  JAVASCRIPT_TEXT,
} from "@/globals/constants/Constants.ts";
import useTopic from "@/hooks/redux/topic/selector/useTopic.ts";
import { TopicTextAndTypeHook } from "@/globals/models/types/TopicTypes.ts";
import { ERROR_MESSAGE_UNKNOWN_TOPIC_PREFIX } from "@/globals/constants/ErrorMessages.ts";

export default function useTopicTextAndType(): TopicTextAndTypeHook {
  const topic: TopicEnum | null = useTopic();
  switch (topic) {
    case TopicEnum.HTML:
      return {
        text: HTML_TEXT,
        type: TopicEnum.HTML,
      };
    case TopicEnum.CSS:
      return {
        text: CSS_TEXT,
        type: TopicEnum.CSS,
      };
    case TopicEnum.JAVASCRIPT:
      return {
        text: JAVASCRIPT_TEXT,
        type: TopicEnum.JAVASCRIPT,
      };
    case TopicEnum.ACCESSIBILITY:
      return {
        text: ACCESSIBILITY_TEXT,
        type: TopicEnum.ACCESSIBILITY,
      };
    case null:
      return {
        text: "",
        type: TopicEnum.HTML,
      };
    default:
      throw new Error(`${ERROR_MESSAGE_UNKNOWN_TOPIC_PREFIX}${topic}`);
  }
}
