import { render, screen } from "@testing-library/react";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import ScoreCard from "@/components/container/ScoreCard/ScoreCard.tsx";
import useCurrentScore from "@/hooks/redux/topic/selector/useCurrentScore.ts";
import useScoreSubLine from "@/hooks/quiz/useScoreSubLine.ts";
import TopicContainer from "@/components/container/TopicContainer/TopicContainer.tsx";
import { ReactElement } from "react";

jest.mock(
  "@/hooks/redux/topic/selector/useCurrentScore.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quiz/useScoreSubLine.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/darkMode/selector/useDarkMode.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const topicContainerDataTestId: string = "topic-container";
jest.mock(
  "@/components/container/TopicContainer/TopicContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={topicContainerDataTestId}></div>;
    }),
);

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={labelDataTestId} className={props.type}></div>;
    }),
);

describe("ScoreCard component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<ScoreCard />);
  };

  const scoreMock: number = 8;

  const scoreSubLineMock: string = "sub line";

  const isDarkModeOnMock: boolean = true;

  beforeEach((): void => {
    (useCurrentScore as jest.Mock).mockReturnValue(scoreMock);
    (useScoreSubLine as jest.Mock).mockReturnValue(scoreSubLineMock);
    (useDarkMode as jest.Mock).mockReturnValue(isDarkModeOnMock);
  });

  it("renders div scoreCard", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".scoreCard");

    expect(element).toBeInTheDocument();
  });

  it.each([
    [true, "dark"],
    [false, "light"],
  ])(
    "renders div scoreCard with isDarkModeOn === %s",
    (isDarkModeOn: boolean, className: string): void => {
      (useDarkMode as jest.Mock).mockReturnValue(isDarkModeOn);
      const { container } = setup();

      const element: HTMLElement | null = container.querySelector(".scoreCard");

      expect(element).toHaveClass(`scoreCard--${className}`);
    },
  );

  it("renders component TopicContainer with passed prop text", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(
      topicContainerDataTestId,
    );

    expect(element).toBeInTheDocument();
    expect(TopicContainer).toHaveBeenCalledTimes(1);
    expect(TopicContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders div scoreCardScore", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".scoreCardScore");

    expect(element).toBeInTheDocument();
  });

  it("renders components Label", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(labelDataTestId);

    expect(elements).toHaveLength(2);
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      1,
      {
        type: LabelTypeEnum.SCORE_LABEL,
        text: `${scoreMock}`,
      },
      undefined,
    );
    expect(Label).toHaveBeenNthCalledWith(
      2,
      {
        type: LabelTypeEnum.SCORE_SUB_LINE_LABEL,
        text: `${scoreSubLineMock}`,
      },
      undefined,
    );
  });

  it("calls hook useCurrentScore", (): void => {
    setup();

    expect(useCurrentScore).toHaveBeenCalledTimes(1);
    expect(useCurrentScore).toHaveBeenCalledWith();
    expect(useCurrentScore).toHaveReturnedWith(scoreMock);
  });

  it("calls hook useScoreSubLine", (): void => {
    setup();

    expect(useScoreSubLine).toHaveBeenCalledTimes(1);
    expect(useScoreSubLine).toHaveBeenCalledWith();
    expect(useScoreSubLine).toHaveReturnedWith(scoreSubLineMock);
  });

  it("calls hook useDarkMode", (): void => {
    setup();

    expect(useDarkMode).toHaveBeenCalledTimes(1);
    expect(useDarkMode).toHaveBeenCalledWith();
    expect(useDarkMode).toHaveReturnedWith(isDarkModeOnMock);
  });
});
