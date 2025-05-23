import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  AnswerSelectionHook,
  QuestionAnsweredHook,
  QuizSubmitHook,
  ResetKeyHook,
  SubmitAnswerHook,
  UpdateSelectionResultHook,
} from "@/globals/models/types/QuizTypes.ts";
import useQuizSubmit from "@/hooks/quiz/useQuizSubmit.ts";
import useResultPage from "@/hooks/router/useResultPage.ts";
import useResetKey from "@/hooks/quiz/subhooks/useResetKey.ts";
import useIsQuizFinished from "@/hooks/redux/topic/selector/useIsQuizFinished.ts";
import useIncreaseIndex from "@/hooks/redux/topic/dispatch/useIncreaseIndex.ts";
import useUpdateSelectionResult from "@/hooks/quiz/subhooks/useUpdateSelectionResult.ts";
import useSubmitAnswer from "@/hooks/quiz/subhooks/useSubmitAnswer.ts";
import { ResultPageHook } from "@/globals/models/types/RouterTypes.ts";
import useAnswerSelection from "@/hooks/quiz/subhooks/useAnswerSelection.ts";
import useQuestionAnswered from "@/hooks/quiz/subhooks/useQuestionAnswered.ts";

jest.mock(
  "@/hooks/quiz/subhooks/useAnswerSelection.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quiz/subhooks/useQuestionAnswered.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quiz/subhooks/useSubmitAnswer.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quiz/subhooks/useUpdateSelectionResult.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/topic/dispatch/useIncreaseIndex.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/router/useResultPage.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quiz/subhooks/useResetKey.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/topic/selector/useIsQuizFinished.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const updateValueMock: boolean = true;
const testComponentDataTestId: string = "test-component";
const testComponentDataTestIdSubmit: string = "test-component-submit";
const testComponentDataTestIdUpdate: string = "test-component-update";
const testComponentDataTestIdResetKey: string = "test-component-reset-key";
const testComponentDataTestIdQuestion: string = "test-component-question";
const testComponentDataTestIdFinished: string = "test-component-finished";
const testComponentDataTestIdError: string = "test-component-error";
const TestComponent: React.FC = () => {
  const {
    handleSubmit,
    updateSelectionResult,
    resetKey,
    isQuestionAnswered,
    isQuizFinished,
    hasError,
  }: QuizSubmitHook = useQuizSubmit();

  return (
    <div data-testid={testComponentDataTestId}>
      <div
        data-testid={testComponentDataTestIdSubmit}
        onClick={handleSubmit}
      ></div>
      <div
        data-testid={testComponentDataTestIdUpdate}
        onClick={() => updateSelectionResult(updateValueMock)}
      ></div>
      <div data-testid={testComponentDataTestIdResetKey}>{`${resetKey}`}</div>
      <div
        data-testid={testComponentDataTestIdQuestion}
      >{`${isQuestionAnswered}`}</div>
      <div
        data-testid={testComponentDataTestIdFinished}
      >{`${isQuizFinished}`}</div>
      <div data-testid={testComponentDataTestIdError}>{`${hasError}`}</div>
    </div>
  );
};

describe("useQuizSubmit Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const isAnswerSelectedMock: boolean = true;
  const setIsAnswerSelectedMock: jest.Mock = jest.fn();
  const useAnswerSelectionMock: AnswerSelectionHook = {
    isAnswerSelected: isAnswerSelectedMock,
    setIsAnswerSelected: setIsAnswerSelectedMock,
  };

  const isQuestionAnsweredMock: boolean = true;
  const setIsQuestionAnsweredMock: jest.Mock = jest.fn();
  const useQuestionAnsweredMock: QuestionAnsweredHook = {
    isQuestionAnswered: isQuestionAnsweredMock,
    setIsQuestionAnswered: setIsQuestionAnsweredMock,
  };

  const loadResultPageMock: jest.Mock = jest.fn();
  const useResultPageMock: ResultPageHook = {
    loadResultPage: loadResultPageMock,
  };

  const resetKeyMock: number = 0;
  const resetStatusArrayMock: jest.Mock = jest.fn();
  const useResetKeyMock: ResetKeyHook = {
    resetKey: resetKeyMock,
    resetStatusArray: resetStatusArrayMock,
  };

  const useIsQuizFinishedMock: boolean = true;

  const useIncreaseIndexMock: jest.Mock = jest.fn();

  const updateSelectionResultMock: jest.Mock = jest.fn();
  const useUpdateSelectionResultMock: UpdateSelectionResultHook = {
    updateSelectionResult: updateSelectionResultMock,
  };

  const tryToSubmitAnswerMock: jest.Mock = jest.fn();
  const useSubmitAnswerMock: SubmitAnswerHook = {
    tryToSubmitAnswer: tryToSubmitAnswerMock,
  };

  beforeEach((): void => {
    (useAnswerSelection as jest.Mock).mockReturnValue(useAnswerSelectionMock);
    (useQuestionAnswered as jest.Mock).mockReturnValue(useQuestionAnsweredMock);
    (useResultPage as jest.Mock).mockReturnValue(useResultPageMock);
    (useResetKey as jest.Mock).mockReturnValue(useResetKeyMock);
    (useIsQuizFinished as jest.Mock).mockReturnValue(useIsQuizFinishedMock);
    (useIncreaseIndex as jest.Mock).mockReturnValue(useIncreaseIndexMock);
    (useUpdateSelectionResult as jest.Mock).mockReturnValue(
      useUpdateSelectionResultMock,
    );
    (useSubmitAnswer as jest.Mock).mockReturnValue(useSubmitAnswerMock);
  });

  it("loads ResultPage if isQuizFinished is true", (): void => {
    (useIsQuizFinished as jest.Mock).mockReturnValue(true);
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdSubmit,
    );
    fireEvent.click(element);

    expect(loadResultPageMock).toHaveBeenCalledTimes(1);
    expect(loadResultPageMock).toHaveBeenCalledWith();
  });

  it("loads next question if isQuestionAnswered is true and isQuizFinished is false", (): void => {
    (useIsQuizFinished as jest.Mock).mockReturnValue(false);
    (useQuestionAnswered as jest.Mock).mockReturnValue({
      ...useQuestionAnsweredMock,
      isQuestionAnswered: true,
    });
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdSubmit,
    );
    fireEvent.click(element);

    expect(loadResultPageMock).not.toHaveBeenCalled();

    expect(useIncreaseIndexMock).toHaveBeenCalledTimes(1);
    expect(resetStatusArrayMock).toHaveBeenCalledTimes(1);

    expect(setIsQuestionAnsweredMock).toHaveBeenCalledTimes(1);
    expect(setIsQuestionAnsweredMock).toHaveBeenCalledWith(false);

    expect(setIsAnswerSelectedMock).toHaveBeenCalledTimes(1);
    expect(setIsAnswerSelectedMock).toHaveBeenCalledWith(false);

    const elementQuestion: HTMLElement = screen.getByTestId(
      testComponentDataTestIdQuestion,
    );
    waitFor((): void => expect(elementQuestion.textContent).toEqual("false"));
  });

  it("sets an Error if isAnswerSelected is false, isQuestionAnswered is false and isQuizFinished is false", (): void => {
    (useIsQuizFinished as jest.Mock).mockReturnValue(false);
    (useQuestionAnswered as jest.Mock).mockReturnValue({
      ...useQuestionAnsweredMock,
      isQuestionAnswered: false,
    });
    (useAnswerSelection as jest.Mock).mockReturnValue({
      ...useAnswerSelectionMock,
      isAnswerSelected: false,
    });
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdSubmit,
    );
    fireEvent.click(element);

    expect(loadResultPageMock).not.toHaveBeenCalled();

    expect(useIncreaseIndexMock).not.toHaveBeenCalled();
    expect(resetStatusArrayMock).not.toHaveBeenCalled();
    expect(setIsQuestionAnsweredMock).not.toHaveBeenCalled();
    expect(setIsAnswerSelectedMock).not.toHaveBeenCalled();

    const elementError: HTMLElement = screen.getByTestId(
      testComponentDataTestIdError,
    );
    expect(elementError.textContent).toEqual("true");

    expect(tryToSubmitAnswerMock).not.toHaveBeenCalled();
  });

  it("resets any Error and tries to submit if isAnswerSelected is true, isQuestionAnswered is false and isQuizFinished is false", (): void => {
    (useIsQuizFinished as jest.Mock).mockReturnValue(false);
    (useQuestionAnswered as jest.Mock).mockReturnValue({
      ...useQuestionAnsweredMock,
      isQuestionAnswered: false,
    });
    (useAnswerSelection as jest.Mock).mockReturnValue({
      ...useAnswerSelectionMock,
      isAnswerSelected: true,
    });
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdSubmit,
    );
    fireEvent.click(element);

    expect(loadResultPageMock).not.toHaveBeenCalled();

    expect(useIncreaseIndexMock).not.toHaveBeenCalled();
    expect(resetStatusArrayMock).not.toHaveBeenCalled();
    expect(setIsQuestionAnsweredMock).not.toHaveBeenCalled();
    expect(setIsAnswerSelectedMock).not.toHaveBeenCalled();

    const elementError: HTMLElement = screen.getByTestId(
      testComponentDataTestIdError,
    );
    waitFor((): void => expect(elementError.textContent).toEqual("false"));

    expect(tryToSubmitAnswerMock).toHaveBeenCalledTimes(1);
    expect(tryToSubmitAnswerMock).toHaveBeenCalledWith();
  });

  it("updates SelectionResult", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdUpdate,
    );
    fireEvent.click(element);

    expect(updateSelectionResultMock).toHaveBeenCalledTimes(1);
    expect(updateSelectionResultMock).toHaveBeenCalledWith(updateValueMock);
  });

  it("returns resetKey", (): void => {
    const expected: number = 0;
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdResetKey,
    );

    expect(element.textContent).toEqual(`${expected}`);
  });

  it("returns isQuestionAnswered", (): void => {
    const expected: boolean = true;
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdQuestion,
    );

    expect(element.textContent).toEqual(`${expected}`);
  });

  it("returns isQuizFinished", (): void => {
    const expected: boolean = true;
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdFinished,
    );

    expect(element.textContent).toEqual(`${expected}`);
  });

  it("returns hasError", (): void => {
    const expected: boolean = false;
    setup();

    const element: HTMLElement = screen.getByTestId(
      testComponentDataTestIdError,
    );

    expect(element.textContent).toEqual(`${expected}`);
  });

  it("calls hook useAnswerSelection", (): void => {
    setup();

    expect(useAnswerSelection).toHaveBeenCalledTimes(1);
    expect(useAnswerSelection).toHaveBeenCalledWith();
    expect(useAnswerSelection).toHaveReturnedWith({
      isAnswerSelected: isAnswerSelectedMock,
      setIsAnswerSelected: setIsAnswerSelectedMock,
    });
  });

  it("calls hook useQuestionAnswered", (): void => {
    setup();

    expect(useQuestionAnswered).toHaveBeenCalledTimes(1);
    expect(useQuestionAnswered).toHaveBeenCalledWith();
    expect(useQuestionAnswered).toHaveReturnedWith({
      isQuestionAnswered: isQuestionAnsweredMock,
      setIsQuestionAnswered: setIsQuestionAnsweredMock,
    });
  });

  it("calls hook useResultPage", (): void => {
    setup();

    expect(useResultPage).toHaveBeenCalledTimes(1);
    expect(useResultPage).toHaveBeenCalledWith();
    expect(useResultPage).toHaveReturnedWith({
      loadResultPage: loadResultPageMock,
    });
  });

  it("calls hook useResetKey", (): void => {
    setup();

    expect(useResetKey).toHaveBeenCalledTimes(1);
    expect(useResetKey).toHaveBeenCalledWith();
    expect(useResetKey).toHaveReturnedWith({
      resetKey: resetKeyMock,
      resetStatusArray: resetStatusArrayMock,
    });
  });

  it("calls hook useIsQuizFinished", (): void => {
    setup();

    expect(useIsQuizFinished).toHaveBeenCalledTimes(1);
    expect(useIsQuizFinished).toHaveBeenCalledWith();
    expect(useIsQuizFinished).toHaveReturnedWith(useIsQuizFinishedMock);
  });

  it("calls hook useIncreaseIndex", (): void => {
    setup();

    expect(useIncreaseIndex).toHaveBeenCalledTimes(1);
    expect(useIncreaseIndex).toHaveBeenCalledWith();
    expect(useIncreaseIndex).toHaveReturnedWith(useIncreaseIndexMock);
  });

  it("calls hook useUpdateSelectionResult", (): void => {
    setup();

    expect(useUpdateSelectionResult).toHaveBeenCalledTimes(1);
    expect(useUpdateSelectionResult).toHaveBeenCalledWith({
      setIsSelectedAnswerCorrect: expect.any(Function),
      setIsAnswerSelected: expect.any(Function),
    });
    expect(useUpdateSelectionResult).toHaveReturnedWith({
      updateSelectionResult: updateSelectionResultMock,
    });
  });

  it("calls hook useSubmitAnswer", (): void => {
    setup();

    expect(useSubmitAnswer).toHaveBeenCalledTimes(1);
    expect(useSubmitAnswer).toHaveBeenCalledWith({
      setIsQuestionAnswered: expect.any(Function),
      setHasError: expect.any(Function),
      isAnswerSelected: expect.any(Boolean),
      isSelectedAnswerCorrect: expect.any(Boolean),
    });
    expect(useSubmitAnswer).toHaveReturnedWith({
      tryToSubmitAnswer: tryToSubmitAnswerMock,
    });
  });
});
