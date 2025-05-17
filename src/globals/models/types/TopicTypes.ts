import { TopicEnumColor } from "@/globals/models/enums/TopicEnumColor.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

export type TopicButtonIconHook = {
  src: string;
  alt: string;
  color: TopicEnumColor;
};

export type TopicTextAndTypeHook = {
  text: string;
  type: TopicEnum;
};
