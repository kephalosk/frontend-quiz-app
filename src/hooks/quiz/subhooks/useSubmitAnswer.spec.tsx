import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";
import { SubmitAnswerHook } from "@/globals/models/types/QuizTypes.ts";
import useCurrentIndex from "@/hooks/redux/topic/selector/useCurrentIndex.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import useIncreaseScore from "@/hooks/redux/topic/dispatch/useIncreaseScore.ts";
import useUpdateIsQuizFinished from "@/hooks/redux/topic/dispatch/useUpdateIsQuizFinished.ts";
import useSubmitAnswer, {
  useSubmitAnswerProps,
} from "@/hooks/quiz/subhooks/useSubmitAnswer.ts";

jest.mock(
  "@/hooks/redux/topic/selector/useCurrentIndex.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/topic/selector/useQuestions.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/topic/dispatch/useIncreaseScore.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/topic/dispatch/useUpdateIsQuizFinished.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<useSubmitAnswerProps> = ({
  setIsQuestionAnswered,
  setHasError,
  isAnswerSelected,
  isSelectedAnswerCorrect,
}) => {
  const { tryToSubmitAnswer }: SubmitAnswerHook = useSubmitAnswer({
    setIsQuestionAnswered,
    setHasError,
    isAnswerSelected,
    isSelectedAnswerCorrect,
  });

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => tryToSubmitAnswer()}
    ></div>
  );
};

describe("useSubmitAnswer Hook", (): void => {
  const setIsQuestionAnswered: jest.Mock = jest.fn();
  const setHasError: jest.Mock = jest.fn();
  const isAnswerSelected: boolean = true;
  const isSelectedAnswerCorrect: boolean = true;

  const setup = (propsOverride?: Partial<useSubmitAnswerProps>): void => {
    const defaultProps: useSubmitAnswerProps = {
      setIsQuestionAnswered,
      setHasError,
      isAnswerSelected,
      isSelectedAnswerCorrect,
    };
    const props: useSubmitAnswerProps = { ...defaultProps, ...propsOverride };
    render(<TestComponent {...props} />);
  };

  const currentIndexMock: number = 0;

  const questionsMock: EPQuestion[] = mockedQuestions;

  const increaseScoreMock: jest.Mock = jest.fn();

  const setIsQuizFinishedMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useCurrentIndex as jest.Mock).mockReturnValue(currentIndexMock);
    (useQuestions as jest.Mock).mockReturnValue(questionsMock);
    (useIncreaseScore as jest.Mock).mockReturnValue(increaseScoreMock);
    (useUpdateIsQuizFinished as jest.Mock).mockReturnValue(
      setIsQuizFinishedMock,
    );
  });

  it("sets Error and returns when isAnswerSelected is false", (): void => {
    setup({ isAnswerSelected: false });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(setHasError).toHaveBeenCalledTimes(1);
    expect(increaseScoreMock).not.toHaveBeenCalled();
    expect(setIsQuestionAnswered).not.toHaveBeenCalled();
    expect(setIsQuizFinishedMock).not.toHaveBeenCalled();
  });

  it("increases Score if isSelectedAnswerCorrect is true", (): void => {
    setup({ isAnswerSelected: true, isSelectedAnswerCorrect: true });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(setHasError).not.toHaveBeenCalled();
    expect(increaseScoreMock).toHaveBeenCalled();
  });

  it("sets isQuestionAnswered to true when isAnswerSelected = true", (): void => {
    setup({ isAnswerSelected: true });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(setHasError).not.toHaveBeenCalled();
    expect(setIsQuestionAnswered).toHaveBeenCalledTimes(1);
    expect(setIsQuestionAnswered).toHaveBeenCalledWith(true);
  });

  it("sets isQuizFinished to true when currentIndex === questions.length - 1", (): void => {
    (useCurrentIndex as jest.Mock).mockReturnValue(mockedQuestions.length - 1);
    (useQuestions as jest.Mock).mockReturnValue(mockedQuestions);
    setup({ isAnswerSelected: true });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(setHasError).not.toHaveBeenCalled();
    expect(setIsQuizFinishedMock).toHaveBeenCalledTimes(1);
    expect(setIsQuizFinishedMock).toHaveBeenCalledWith(true);
  });

  it("calls hook useCurrentIndex", (): void => {
    setup();

    expect(useCurrentIndex).toHaveBeenCalledTimes(1);
    expect(useCurrentIndex).toHaveBeenCalledWith();
    expect(useCurrentIndex).toHaveReturnedWith(currentIndexMock);
  });

  it("calls hook useQuestions", (): void => {
    setup();

    expect(useQuestions).toHaveBeenCalledTimes(1);
    expect(useQuestions).toHaveBeenCalledWith();
    expect(useQuestions).toHaveReturnedWith(questionsMock);
  });

  it("calls hook useIncreaseScore", (): void => {
    setup();

    expect(useIncreaseScore).toHaveBeenCalledTimes(1);
    expect(useIncreaseScore).toHaveBeenCalledWith();
    expect(useIncreaseScore).toHaveReturnedWith(increaseScoreMock);
  });

  it("calls hook useUpdateIsQuizFinished", (): void => {
    setup();

    expect(useUpdateIsQuizFinished).toHaveBeenCalledTimes(1);
    expect(useUpdateIsQuizFinished).toHaveBeenCalledWith();
    expect(useUpdateIsQuizFinished).toHaveReturnedWith(setIsQuizFinishedMock);
  });
});
