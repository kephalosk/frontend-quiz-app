import { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TitleContainer from "@/components/container/TitleContainer/TitleContainer.tsx";
import {
  EMPTY_STRING,
  PLAY_AGAIN_BUTTON_TEXT,
  RESULTPAGE_HEADLINE_BOLD_TEXT,
  RESULTPAGE_HEADLINE_TEXT,
} from "@/globals/constants/Constants.ts";
import useResetGame from "@/hooks/result/useResetGame.ts";
import ScoreCard from "@/components/container/ScoreCard/ScoreCard.tsx";
import SubmitButton from "@/components/atoms/SubmitButton/SubmitButton.tsx";
import ResultPage from "@/pages/ResultPage/ResultPage.tsx";
import { ResetGameHook } from "@/globals/models/types/ResultTypes.ts";
import { ReactNamesEnum } from "@/globals/models/enums/ReactNamesEnum.ts";

jest.mock(
  "@/hooks/result/useResetGame.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const titleContainerDataTestId: string = "title-container";
jest.mock(
  "@/components/container/TitleContainer/TitleContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={titleContainerDataTestId}></div>;
    }),
);

const scoreCardDataTestId: string = "score-card";
jest.mock(
  "@/components/container/ScoreCard/ScoreCard.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={scoreCardDataTestId}></div>;
    }),
);

const submitButtonContainerDataTestId: string = "submit-button";
jest.mock(
  "@/components/atoms/SubmitButton/SubmitButton.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <div
          data-testid={submitButtonContainerDataTestId}
          onClick={props.handleButtonClick}
        ></div>
      );
    }),
);

describe("ResultPage Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<ResultPage />);
  };

  const handleResetMock: jest.Mock = jest.fn();
  const useResetGameMock: ResetGameHook = {
    handleReset: handleResetMock,
  };

  beforeEach((): void => {
    (useResetGame as jest.Mock).mockReturnValue(useResetGameMock);
  });

  it(`renders div resultPage`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".resultPage");

    expect(element).toBeInTheDocument();
  });

  it("renders component TitleContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(titleContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(TitleContainer).toHaveBeenCalledTimes(1);
    expect(TitleContainer).toHaveBeenCalledWith(
      {
        firstLine: RESULTPAGE_HEADLINE_TEXT,
        headline: RESULTPAGE_HEADLINE_BOLD_TEXT,
        subLine: EMPTY_STRING,
      },
      undefined,
    );
  });

  it(`renders div resultPageResult`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".resultPageResult");

    expect(element).toBeInTheDocument();
  });

  it("renders component ScoreCard", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(scoreCardDataTestId);

    expect(element).toBeInTheDocument();
    expect(ScoreCard).toHaveBeenCalledTimes(1);
    expect(ScoreCard).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component SubmitButton", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      submitButtonContainerDataTestId,
    );

    expect(element).toBeInTheDocument();
    expect(SubmitButton).toHaveBeenCalledTimes(1);
    expect(SubmitButton).toHaveBeenCalledWith(
      { text: PLAY_AGAIN_BUTTON_TEXT, handleButtonClick: handleResetMock },
      undefined,
    );
  });

  it("calls handleReset when SubmitButton is triggered", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      submitButtonContainerDataTestId,
    );
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(handleResetMock).toHaveBeenCalledTimes(1);
    expect(handleResetMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: ReactNamesEnum.ON_CLICK }),
    );
  });

  it("calls hook useResetGame", (): void => {
    setup();

    expect(useResetGame).toHaveBeenCalledTimes(1);
    expect(useResetGame).toHaveBeenCalledWith();
    expect(useResetGame).toHaveReturnedWith({ handleReset: handleResetMock });
  });
});
