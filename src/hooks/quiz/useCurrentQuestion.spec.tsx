import React from "react";
import { render, screen } from "@testing-library/react";
import { CurrentQuestionHook } from "@/globals/models/types/QuizTypes.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import useCurrentIndex from "@/hooks/redux/topic/selector/useCurrentIndex.ts";
import useProgressInfo from "@/hooks/quiz/useProgressInfo.ts";
import useProgressPerCent from "@/hooks/quiz/useProgressPerCent.ts";
import useCurrentQuestion from "@/hooks/quiz/useCurrentQuestion.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";

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
  "@/hooks/quiz/useProgressInfo.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quiz/useProgressPerCent.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const testComponentDataTestIdQuestion: string = "test-component-question";
const testComponentDataTestIdProgressInfo: string =
  "test-component-progress-info";
const testComponentDataTestIdProgressPerCent: string =
  "test-component-progress-per-cent";
const TestComponent: React.FC = () => {
  const {
    currentQuestionText,
    progressInfo,
    progressPerCent,
  }: CurrentQuestionHook = useCurrentQuestion();

  return (
    <div data-testid={testComponentDataTestId}>
      <div
        data-testid={testComponentDataTestIdQuestion}
      >{`${currentQuestionText}`}</div>
      <div
        data-testid={testComponentDataTestIdProgressInfo}
      >{`${progressInfo}`}</div>
      <div
        data-testid={testComponentDataTestIdProgressPerCent}
      >{`${progressPerCent}`}</div>
    </div>
  );
};

describe("useCurrentQuestion Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const questionsMock: EPQuestion[] = mockedQuestions;

  const currentIndexMock: number = 0;

  const progressInfoMock: string = "progressInfo";

  const progressPerCentMock: number = 50;

  beforeEach((): void => {
    (useQuestions as jest.Mock).mockReturnValue(questionsMock);
    (useCurrentIndex as jest.Mock).mockReturnValue(currentIndexMock);
    (useProgressInfo as jest.Mock).mockReturnValue(progressInfoMock);
    (useProgressPerCent as jest.Mock).mockReturnValue(progressPerCentMock);
  });

  it("returns currentQuestionText", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdQuestion,
    );

    expect(element.textContent).toEqual(
      questionsMock[currentIndexMock].question,
    );
  });

  it("returns currentQuestionText if questions are undefined", (): void => {
    (useQuestions as jest.Mock).mockReturnValue([]);
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdQuestion,
    );

    expect(element.textContent).toEqual(EMPTY_STRING);
  });

  it("returns progressInfo", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdProgressInfo,
    );

    expect(element.textContent).toEqual(progressInfoMock);
  });

  it("returns progressPerCent", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdProgressPerCent,
    );

    expect(element.textContent).toEqual(`${progressPerCentMock}`);
  });

  it("calls hook useQuestions", (): void => {
    setup();

    expect(useQuestions).toHaveBeenCalledTimes(1);
    expect(useQuestions).toHaveBeenCalledWith();
    expect(useQuestions).toHaveReturnedWith(questionsMock);
  });

  it("calls hook useCurrentIndex", (): void => {
    setup();

    expect(useCurrentIndex).toHaveBeenCalledTimes(1);
    expect(useCurrentIndex).toHaveBeenCalledWith();
    expect(useCurrentIndex).toHaveReturnedWith(currentIndexMock);
  });

  it("calls hook useProgressInfo", (): void => {
    setup();

    expect(useProgressInfo).toHaveBeenCalledTimes(1);
    expect(useProgressInfo).toHaveBeenCalledWith({
      currentIndex: currentIndexMock,
      totalQuestions: questionsMock.length,
    });
    expect(useProgressInfo).toHaveReturnedWith(progressInfoMock);
  });

  it("calls hook useProgressPerCent", (): void => {
    setup();

    expect(useProgressPerCent).toHaveBeenCalledTimes(1);
    expect(useProgressPerCent).toHaveBeenCalledWith({
      currentIndex: currentIndexMock,
      totalQuestions: questionsMock.length,
    });
    expect(useProgressPerCent).toHaveReturnedWith(progressPerCentMock);
  });
});
