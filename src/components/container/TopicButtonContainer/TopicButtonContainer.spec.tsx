import { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { TopicItem, TopicItems } from "@/globals/constants/TopicItems.ts";
import TopicButtonContainer from "@/components/container/TopicButtonContainer/TopicButtonContainer.tsx";
import TopicButton from "@/components/container/TopicButton/TopicButton.tsx";
import { QuizStartHook } from "@/globals/models/types/QuizTypes.ts";
import useQuizStart from "@/hooks/quiz/useQuizStart.ts";

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
  "@/hooks/quiz/useQuizStart.ts",
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

  const handleQuizStartMock: jest.Mock = jest.fn();
  const useQuizStartMock: QuizStartHook = {
    handleQuizStart: handleQuizStartMock,
  };

  beforeEach((): void => {
    (useQuizStart as jest.Mock).mockReturnValue(useQuizStartMock);
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

  it("calls handleQuizStart when TopicButton is clicked", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      topicButtonDataTestId,
    );
    fireEvent.click(elements.at(0)!);

    expect(handleQuizStartMock).toHaveBeenCalledTimes(1);
    expect(handleQuizStartMock).toHaveBeenCalledWith(topicMock);
  });

  it("calls hook useQuizStart", (): void => {
    setup();

    expect(useQuizStart).toHaveBeenCalledTimes(1);
    expect(useQuizStart).toHaveBeenCalledWith();
    expect(useQuizStart).toHaveReturnedWith(useQuizStartMock);
  });
});
