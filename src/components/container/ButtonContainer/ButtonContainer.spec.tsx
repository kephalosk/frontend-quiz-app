import { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import QuizButtonContainer from "@/components/container/QuizButtonContainer/QuizButtonContainer.tsx";
import { QuizSubmitHook } from "@/globals/models/types/QuizTypes.ts";
import useQuizSubmit from "@/hooks/quiz/useQuizSubmit.ts";
import getSubmitButtonText from "@/globals/helper/getSubmitButtonText.ts";
import ButtonContainer from "@/components/container/ButtonContainer/ButtonContainer.tsx";
import SubmitButton from "@/components/atoms/SubmitButton/SubmitButton.tsx";
import ErrorContainer from "@/components/container/ErrorContainer/ErrorContainer.tsx";

jest.mock(
  "@/hooks/quiz/useQuizSubmit.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/getSubmitButtonText.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const propagateCorrectSelectionMock: boolean = true;
const quizButtonContainerDataTestId: string = "quiz-button-container";
jest.mock(
  "@/components/container/QuizButtonContainer/QuizButtonContainer.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <button
          data-testid={quizButtonContainerDataTestId}
          onClick={() =>
            props.propagateCorrectSelection(propagateCorrectSelectionMock)
          }
        ></button>
      );
    }),
);

const submitButtonDataTestId: string = "submit-button";
jest.mock(
  "@/components/atoms/SubmitButton/SubmitButton.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <button
          data-testid={submitButtonDataTestId}
          onClick={() => props.handleButtonClick()}
        ></button>
      );
    }),
);

const errorContainerDataTestId: string = "error-container";
jest.mock(
  "@/components/container/ErrorContainer/ErrorContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <button data-testid={errorContainerDataTestId}></button>;
    }),
);

describe("ButtonContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<ButtonContainer />);
  };

  const handleSubmitMock: jest.Mock = jest.fn();
  const updateSelectionResultMock: jest.Mock = jest.fn();
  const resetKeyMock: number = 0;
  const isQuestionAnsweredMock: boolean = true;
  const isQuizFinishedMock: boolean = true;
  const hasErrorMock: boolean = true;
  const useQuizSubmitMock: QuizSubmitHook = {
    handleSubmit: handleSubmitMock,
    updateSelectionResult: updateSelectionResultMock,
    resetKey: resetKeyMock,
    isQuestionAnswered: isQuestionAnsweredMock,
    isQuizFinished: isQuizFinishedMock,
    hasError: hasErrorMock,
  };

  const submitButtonTextMock: string = "submit";

  beforeEach((): void => {
    (useQuizSubmit as jest.Mock).mockReturnValue(useQuizSubmitMock);
    (getSubmitButtonText as jest.Mock).mockReturnValue(submitButtonTextMock);
  });

  it(`renders div buttonContainer`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".buttonContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component QuizButtonContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      quizButtonContainerDataTestId,
    );

    expect(element).toBeInTheDocument();
    expect(QuizButtonContainer).toHaveBeenCalledTimes(1);
    expect(QuizButtonContainer).toHaveBeenCalledWith(
      {
        isQuestionAnswered: isQuestionAnsweredMock,
        propagateCorrectSelection: updateSelectionResultMock,
        resetKey: resetKeyMock,
      },
      undefined,
    );
  });

  it("renders component SubmitButton", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(submitButtonDataTestId);

    expect(element).toBeInTheDocument();
    expect(SubmitButton).toHaveBeenCalledTimes(1);
    expect(SubmitButton).toHaveBeenCalledWith(
      {
        text: submitButtonTextMock,
        handleButtonClick: handleSubmitMock,
      },
      undefined,
    );
  });

  it(`renders div buttonContainerError`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".buttonContainerError",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component ErrorContainer when hasError = true", (): void => {
    (useQuizSubmit as jest.Mock).mockReturnValue({
      ...useQuizSubmitMock,
      hasError: true,
    });
    setup();

    const element: HTMLElement = screen.getByTestId(errorContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(ErrorContainer).toHaveBeenCalledTimes(1);
    expect(ErrorContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("does not render component ErrorContainer when hasError = false", (): void => {
    (useQuizSubmit as jest.Mock).mockReturnValue({
      ...useQuizSubmitMock,
      hasError: false,
    });
    setup();

    const element: HTMLElement | null = screen.queryByTestId(
      errorContainerDataTestId,
    );

    expect(element).not.toBeInTheDocument();
    expect(ErrorContainer).not.toHaveBeenCalled();
  });

  it("calls updateSelectionResult when QuizButtonContainer is triggered", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      quizButtonContainerDataTestId,
    );
    fireEvent.click(elements.at(0)!);

    expect(updateSelectionResultMock).toHaveBeenCalledTimes(1);
    expect(updateSelectionResultMock).toHaveBeenCalledWith(
      propagateCorrectSelectionMock,
    );
  });

  it("calls handleSubmit when SubmitButton is triggered", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      submitButtonDataTestId,
    );
    fireEvent.click(elements.at(0)!);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
    expect(handleSubmitMock).toHaveBeenCalledWith();
  });

  it("calls hook useQuizSubmit", (): void => {
    setup();

    expect(useQuizSubmit).toHaveBeenCalledTimes(1);
    expect(useQuizSubmit).toHaveBeenCalledWith();
    expect(useQuizSubmit).toHaveReturnedWith({
      handleSubmit: handleSubmitMock,
      updateSelectionResult: updateSelectionResultMock,
      resetKey: resetKeyMock,
      isQuestionAnswered: isQuestionAnsweredMock,
      isQuizFinished: isQuizFinishedMock,
      hasError: hasErrorMock,
    });
  });

  it("calls hook getSubmitButtonText", (): void => {
    setup();

    expect(getSubmitButtonText).toHaveBeenCalledTimes(1);
    expect(getSubmitButtonText).toHaveBeenCalledWith(
      isQuizFinishedMock,
      isQuestionAnsweredMock,
    );
    expect(getSubmitButtonText).toHaveReturnedWith(submitButtonTextMock);
  });
});
