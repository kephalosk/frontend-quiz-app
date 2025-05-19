import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { TopicTextAndTypeHook } from "@/globals/models/types/TopicTypes.ts";
import {
  ACCESSIBILITY_TEXT,
  CSS_TEXT,
  HTML_TEXT,
  JAVASCRIPT_TEXT,
} from "@/globals/constants/Constants.ts";
import useTopicTextAndType from "@/hooks/topic/useTopicTextAndType.ts";
import useTopic from "@/hooks/redux/topic/selector/useTopic.ts";
import { ERROR_MESSAGE_UNKNOWN_TOPIC_PREFIX } from "@/globals/constants/ErrorMessages.ts";

jest.mock(
  "@/hooks/redux/topic/selector/useTopic.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const { text, type }: TopicTextAndTypeHook = useTopicTextAndType();

  return (
    <div data-testid={testComponentDataTestId} className={type}>
      {text}
    </div>
  );
};

describe("useTopicTextAndType hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const useTopicMock: TopicEnum = TopicEnum.HTML;

  beforeEach((): void => {
    (useTopic as jest.Mock).mockReturnValue(useTopicMock);
  });

  it.each([
    [TopicEnum.HTML, HTML_TEXT, TopicEnum.HTML],
    [TopicEnum.CSS, CSS_TEXT, TopicEnum.CSS],
    [TopicEnum.JAVASCRIPT, JAVASCRIPT_TEXT, TopicEnum.JAVASCRIPT],
    [TopicEnum.ACCESSIBILITY, ACCESSIBILITY_TEXT, TopicEnum.ACCESSIBILITY],
    ["undefined" as TopicEnum, "", undefined],
  ])(
    "returns text and type for topic %s",
    (_: TopicEnum, text: string, type: TopicEnum | undefined): void => {
      (useTopic as jest.Mock).mockReturnValue(type);
      setup();

      const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

      expect(element).toHaveClass(type ?? TopicEnum.HTML);
      expect(element).toHaveTextContent(text);
    },
  );

  it("throws if topic is unknown", (): void => {
    const topic: TopicEnum = "unknown topic" as TopicEnum;
    (useTopic as jest.Mock).mockReturnValue(topic);

    expect(() => setup()).toThrow(
      new Error(`${ERROR_MESSAGE_UNKNOWN_TOPIC_PREFIX}${topic}`),
    );
  });

  it("calls hook useTopic", (): void => {
    setup();

    expect(useTopic).toHaveBeenCalledTimes(1);
    expect(useTopic).toHaveBeenCalledWith();
    expect(useTopic).toHaveReturnedWith(useTopicMock);
  });
});
