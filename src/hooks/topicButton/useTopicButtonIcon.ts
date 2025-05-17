import { TopicButtonIconHook } from "@/globals/models/types/TopicButtonTypes.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import {
  ACCESSIBILITY_ICON_SRC,
  CSS_ICON_SRC,
  HTML_ICON_SRC,
  JAVASCRIPT_ICON_SRC,
} from "@/globals/constants/Ressources.ts";
import {
  ACCESSIBILITY_ICON_ALT_TEXT,
  CSS_ICON_ALT_TEXT,
  HTML_ICON_ALT_TEXT,
  JAVASCRIPT_ICON_ALT_TEXT,
} from "@/globals/constants/Constants.ts";
import { TopicEnumColor } from "@/globals/models/enums/TopicEnumColor.ts";

export default function useTopicButtonIcon(
  topic: TopicEnum,
): TopicButtonIconHook {
  switch (topic) {
    case TopicEnum.HTML:
      return {
        src: HTML_ICON_SRC,
        alt: HTML_ICON_ALT_TEXT,
        color: TopicEnumColor.HTML,
      };
    case TopicEnum.CSS:
      return {
        src: CSS_ICON_SRC,
        alt: CSS_ICON_ALT_TEXT,
        color: TopicEnumColor.CSS,
      };
    case TopicEnum.JAVASCRIPT:
      return {
        src: JAVASCRIPT_ICON_SRC,
        alt: JAVASCRIPT_ICON_ALT_TEXT,
        color: TopicEnumColor.JAVASCRIPT,
      };
    case TopicEnum.ACCESSIBILITY:
      return {
        src: ACCESSIBILITY_ICON_SRC,
        alt: ACCESSIBILITY_ICON_ALT_TEXT,
        color: TopicEnumColor.ACCESSIBILITY,
      };
    default:
      return {
        src: HTML_ICON_SRC,
        alt: HTML_ICON_ALT_TEXT,
        color: TopicEnumColor.HTML,
      };
  }
}
