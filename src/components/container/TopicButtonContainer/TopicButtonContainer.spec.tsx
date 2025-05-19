import { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { TopicItem, TopicItems } from "@/globals/constants/TopicItems.ts";
import TopicButtonContainer from "@/components/container/TopicButtonContainer/TopicButtonContainer.tsx";
import useUpdateTopic from "@/hooks/redux/topic/dispatch/useUpdateTopic.ts";
import TopicButton from "@/components/container/TopicButton/TopicButton.tsx";

const topicMock: TopicEnum = TopicEnum.HTML;
const topicButtonDataTestId: string = "topic-button";
jest.mock(
  "@/components/container/TopicButton/TopicButton.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <button
          data-testid={topicButtonDataTestId}
          onClick={() => props.handleButtonClick(topicMock)}
        >
          {props.text}
        </button>
      );
    }),
);

jest.mock(
  "@/hooks/redux/topic/dispatch/useUpdateTopic.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("TopicButtonContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TopicButtonContainer />);
  };

  const useUpdateTopicMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useUpdateTopic as jest.Mock).mockReturnValue(useUpdateTopicMock);
  });

  it(`renders div topicButtonContainer`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".topicButtonContainer",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders components TopicButton", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      topicButtonDataTestId,
    );

    expect(elements).toHaveLength(TopicItems.length);
    expect(TopicButton).toHaveBeenCalledTimes(TopicItems.length);
    TopicItems.forEach((item: TopicItem, index: number) => {
      expect(TopicButton).toHaveBeenNthCalledWith(
        index + 1,
        {
          type: item.topic,
          text: item.text,
          handleButtonClick: expect.any(Function),
        },
        undefined,
      );
    });
  });

  it("calls handleTopicUpdate when TopicButton is clicked", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      topicButtonDataTestId,
    );
    fireEvent.click(elements.at(0)!);

    expect(useUpdateTopicMock).toHaveBeenCalledTimes(1);
    expect(useUpdateTopicMock).toHaveBeenCalledWith(topicMock);
  });

  it("calls hook useUpdateTopic", (): void => {
    setup();

    expect(useUpdateTopic).toHaveBeenCalledTimes(1);
    expect(useUpdateTopic).toHaveBeenCalledWith();
    expect(useUpdateTopic).toHaveReturnedWith(useUpdateTopicMock);
  });
});
