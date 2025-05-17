import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import useTopicButtonIcon from "@/hooks/topicButton/useTopicButtonIcon.ts";
import { TopicButtonIconHook } from "@/globals/models/types/TopicButtonTypes.ts";
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

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{ topic: TopicEnum }> = ({
  topic,
}): ReactElement => {
  const { src, alt, color }: TopicButtonIconHook = useTopicButtonIcon(topic);

  return (
    <img
      data-testid={testComponentDataTestId}
      src={src}
      alt={alt}
      className={color}
    ></img>
  );
};

describe("useTopicButtonIcon hook", (): void => {
  const setup = (topic: TopicEnum): void => {
    render(<TestComponent topic={topic} />);
  };

  it.each([
    [TopicEnum.HTML, HTML_ICON_SRC, HTML_ICON_ALT_TEXT, TopicEnumColor.HTML],
    [TopicEnum.CSS, CSS_ICON_SRC, CSS_ICON_ALT_TEXT, TopicEnumColor.CSS],
    [
      TopicEnum.JAVASCRIPT,
      JAVASCRIPT_ICON_SRC,
      JAVASCRIPT_ICON_ALT_TEXT,
      TopicEnumColor.JAVASCRIPT,
    ],
    [
      TopicEnum.ACCESSIBILITY,
      ACCESSIBILITY_ICON_SRC,
      ACCESSIBILITY_ICON_ALT_TEXT,
      TopicEnumColor.ACCESSIBILITY,
    ],
    [
      "undefined" as TopicEnum,
      HTML_ICON_SRC,
      HTML_ICON_ALT_TEXT,
      TopicEnumColor.HTML,
    ],
  ])(
    "returns src and alt for topic %s",
    (
      topic: TopicEnum,
      src: string,
      alt: string,
      color: TopicEnumColor,
    ): void => {
      setup(topic);

      const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

      expect(element).toHaveAttribute("src", src);
      expect(element).toHaveAttribute("alt", alt);
      expect(element).toHaveClass(color);
    },
  );
});
