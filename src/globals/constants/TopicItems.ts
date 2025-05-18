import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import {
  ACCESSIBILITY_TEXT,
  CSS_TEXT,
  HTML_TEXT,
  JAVASCRIPT_TEXT,
} from "@/globals/constants/Constants.ts";

export interface TopicItem {
  key: string;
  topic: TopicEnum;
  text: string;
}

export const getTopicKey: (topic: TopicEnum) => string = (
  topic: TopicEnum,
): string => {
  const topicWithoutWhitespace: string = topic.replace(/\s/g, "");
  return topicWithoutWhitespace.toLowerCase();
};

export const TopicItems: TopicItem[] = [
  {
    key: getTopicKey(TopicEnum.HTML),
    topic: TopicEnum.HTML,
    text: HTML_TEXT,
  },
  {
    key: getTopicKey(TopicEnum.CSS),
    topic: TopicEnum.CSS,
    text: CSS_TEXT,
  },
  {
    key: getTopicKey(TopicEnum.JAVASCRIPT),
    topic: TopicEnum.JAVASCRIPT,
    text: JAVASCRIPT_TEXT,
  },
  {
    key: getTopicKey(TopicEnum.ACCESSIBILITY),
    topic: TopicEnum.ACCESSIBILITY,
    text: ACCESSIBILITY_TEXT,
  },
];
