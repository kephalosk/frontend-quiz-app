import { render, screen } from "@testing-library/react";
import QuizPage from "@/pages/QuizPage/QuizPage.tsx";
import QuestionContainer from "@/components/container/QuestionContainer/QuestionContainer.tsx";
import ButtonContainer from "@/components/container/ButtonContainer/ButtonContainer.tsx";
import useCurrentQuestion from "@/hooks/quiz/useCurrentQuestion.ts";
import { CurrentQuestionHook } from "@/globals/models/types/QuizTypes.ts";
import { ReactElement } from "react";
import useRelocationForUndefinedTopic from "@/hooks/router/useRelocationForUndefinedTopic.ts";

jest.mock(
  "@/hooks/quiz/useCurrentQuestion.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/router/useRelocationForUndefinedTopic.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const questionContainerTestId: string = "question-container";
jest.mock(
  "@/components/container/QuestionContainer/QuestionContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={questionContainerTestId}></div>;
    }),
);

const buttonContainerTestId: string = "button-container";
jest.mock(
  "@/components/container/ButtonContainer/ButtonContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={buttonContainerTestId}></div>;
    }),
);

describe("QuizPage", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<QuizPage />);
  };

  const currentQuestionTextMock: string = "quizButton";
  const progressInfoMock: string = "quizButtonPosition";
  const progressPerCentMock: number = 50;
  const useCurrentQuestionMock: CurrentQuestionHook = {
    currentQuestionText: currentQuestionTextMock,
    progressInfo: progressInfoMock,
    progressPerCent: progressPerCentMock,
  };

  beforeEach((): void => {
    (useCurrentQuestion as jest.Mock).mockReturnValue(useCurrentQuestionMock);
  });

  it("renders div quizPage", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".quizPage");

    expect(element).toBeInTheDocument();
  });

  it("renders component QuestionContainer", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(
      questionContainerTestId,
    );

    expect(element).toBeInTheDocument();
    expect(QuestionContainer).toHaveBeenCalledTimes(1);
    expect(QuestionContainer).toHaveBeenCalledWith(
      {
        question: currentQuestionTextMock,
        progressInfo: progressInfoMock,
        progressPerCent: progressPerCentMock,
      },
      undefined,
    );
  });

  it("renders component ButtonContainer", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(
      buttonContainerTestId,
    );

    expect(element).toBeInTheDocument();
    expect(ButtonContainer).toHaveBeenCalledTimes(1);
    expect(ButtonContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("calls hook useCurrentQuestion", (): void => {
    setup();

    expect(useCurrentQuestion).toHaveBeenCalledTimes(1);
    expect(useCurrentQuestion).toHaveBeenCalledWith();
    expect(useCurrentQuestion).toHaveReturnedWith({
      currentQuestionText: currentQuestionTextMock,
      progressInfo: progressInfoMock,
      progressPerCent: progressPerCentMock,
    });
  });

  it("calls hook useRelocationForUndefinedTopic", (): void => {
    setup();

    expect(useRelocationForUndefinedTopic).toHaveBeenCalledTimes(1);
    expect(useRelocationForUndefinedTopic).toHaveBeenCalledWith();
    expect(useRelocationForUndefinedTopic).toHaveReturnedWith();
  });
});
