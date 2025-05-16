import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import React, { ReactElement } from "react";
import useLabelType from "@/hooks/label/useLabelType.ts";
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

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{ topic: TopicEnum }> = ({
  topic,
}): ReactElement => {
  const { src, alt }: TopicButtonIconHook = useTopicButtonIcon(topic);

  return <img data-testid={testComponentDataTestId} src={src} alt={alt}></img>;
};

describe("useTopicButtonIcon hook", (): void => {
  const setup = (topic: TopicEnum): void => {
    render(<TestComponent topic={topic} />);
  };

  it.each([
    [TopicEnum.HTML, HTML_ICON_SRC, HTML_ICON_ALT_TEXT],
    [TopicEnum.CSS, CSS_ICON_SRC, CSS_ICON_ALT_TEXT],
    [TopicEnum.JAVASCRIPT, JAVASCRIPT_ICON_SRC, JAVASCRIPT_ICON_ALT_TEXT],
    [
      TopicEnum.ACCESSIBILITY,
      ACCESSIBILITY_ICON_SRC,
      ACCESSIBILITY_ICON_ALT_TEXT,
    ],
    ["undefined" as TopicEnum, HTML_ICON_SRC, HTML_ICON_ALT_TEXT],
  ])(
    "returns src and alt for topic %s",
    (topic: TopicEnum, src: string, alt: string): void => {
      setup(topic);

      const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

      expect(element).toHaveAttribute("src", src);
      expect(element).toHaveAttribute("alt", alt);
    },
  );
});
