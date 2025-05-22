import { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import QuizButtonContainer, {
  QuizButtonContainerProps,
} from "@/components/container/QuizButtonContainer/QuizButtonContainer.tsx";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import { UpdateSelectionHook } from "@/globals/models/types/QuizTypes.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import { DefaultQuestionStatusArray } from "@/globals/constants/DefaultQuestionStatusArray.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";
import QuizButton from "@/components/container/QuizButton/QuizButton.tsx";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import useCurrentIndex from "@/hooks/redux/topic/selector/useCurrentIndex.ts";
import useUpdateSelection from "@/hooks/quiz/useUpdateSelection.ts";
import getCurrentStatusArray from "@/hooks/quiz/getCurrentStatusArray.ts";
import getQuestionPositionByIndex from "@/globals/helper/getQuestionPositionByIndex.ts";

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
  "@/hooks/quiz/useUpdateSelection.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quiz/getCurrentStatusArray.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/getQuestionPositionByIndex.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const answerMock: string = "answer";
const positionClickedMock: QuestionPositionEnum = QuestionPositionEnum.A;
const quizButtonDataTestId: string = "quiz-button";
jest.mock(
  "@/components/container/QuizButton/QuizButton.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <button
          data-testid={quizButtonDataTestId}
          onClick={() => props.propagateAnswer(answerMock, positionClickedMock)}
        ></button>
      );
    }),
);

describe("ButtonContainer Component", (): void => {
  const isQuestionAnswered: boolean = false;
  const propagateCorrectSelectionMock: jest.Mock = jest.fn();
  const setup = (
    propsOverride?: Partial<QuizButtonContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: QuizButtonContainerProps = {
      isQuestionAnswered,
      propagateCorrectSelection: propagateCorrectSelectionMock,
    };
    const props = { ...defaultProps, ...propsOverride };
    return render(<QuizButtonContainer {...props} />);
  };

  const questionsMock: EPQuestion[] = mockedQuestions;

  const currentIndexMock: number = 0;

  const statusArraySelectedMock: QuestionStatusEnum[] =
    DefaultQuestionStatusArray;
  const statusArrayAnsweredMock: QuestionStatusEnum[] =
    DefaultQuestionStatusArray;
  const handleSelectionMock: jest.Mock = jest.fn();
  const useUpdateSelectionMock: UpdateSelectionHook = {
    statusArraySelected: statusArraySelectedMock,
    statusArrayAnswered: statusArrayAnsweredMock,
    handleSelection: handleSelectionMock,
  };

  const currentStatusArrayMock: QuestionStatusEnum[] =
    DefaultQuestionStatusArray;

  const getQuestionPositionByIndexMock: QuestionPositionEnum =
    QuestionPositionEnum.A;

  beforeEach((): void => {
    (useQuestions as jest.Mock).mockReturnValue(questionsMock);
    (useCurrentIndex as jest.Mock).mockReturnValue(currentIndexMock);
    (useUpdateSelection as jest.Mock).mockReturnValue(useUpdateSelectionMock);
    (getCurrentStatusArray as jest.Mock).mockReturnValue(
      currentStatusArrayMock,
    );
    (getQuestionPositionByIndex as jest.Mock).mockReturnValue(
      getQuestionPositionByIndexMock,
    );
  });

  it(`renders div quizButtonContainer`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".quizButtonContainer",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders components QuizButton from currentQuestion", (): void => {
    const currentOptions: string[] = questionsMock[currentIndexMock].options;
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(quizButtonDataTestId);

    expect(elements).toHaveLength(currentOptions.length);
    expect(QuizButton).toHaveBeenCalledTimes(currentOptions.length);
    currentOptions.forEach((option: string, index: number) => {
      expect(QuizButton).toHaveBeenNthCalledWith(
        index + 1,
        {
          text: option,
          position: getQuestionPositionByIndexMock,
          status: currentStatusArrayMock[index],
          propagateAnswer: handleSelectionMock,
          isDisabled: isQuestionAnswered,
        },
        undefined,
      );
    });
  });

  it("does not render components QuizButton when currentQuestion is undefined", (): void => {
    const questionsUndefined: EPQuestion[] = [
      undefined as unknown as EPQuestion,
      undefined as unknown as EPQuestion,
      undefined as unknown as EPQuestion,
      undefined as unknown as EPQuestion,
    ];
    (useQuestions as jest.Mock).mockReturnValue(questionsUndefined);
    setup();

    const elements: HTMLElement[] =
      screen.queryAllByTestId(quizButtonDataTestId);

    expect(elements).toHaveLength(0);
    expect(QuizButton).not.toHaveBeenCalled();
  });

  it("calls handleSelection when QuizButton is triggered", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(quizButtonDataTestId);
    fireEvent.click(elements.at(0)!);

    expect(handleSelectionMock).toHaveBeenCalledTimes(1);
    expect(handleSelectionMock).toHaveBeenCalledWith(
      answerMock,
      positionClickedMock,
    );
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

  it("calls hook useUpdateSelection", (): void => {
    setup();

    expect(useUpdateSelection).toHaveBeenCalledTimes(1);
    expect(useUpdateSelection).toHaveBeenCalledWith(
      questionsMock[currentIndexMock],
      propagateCorrectSelectionMock,
    );
    expect(useUpdateSelection).toHaveReturnedWith(useUpdateSelectionMock);
  });

  it("calls hook getCurrentStatusArray", (): void => {
    setup();

    expect(getCurrentStatusArray).toHaveBeenCalledTimes(1);
    expect(getCurrentStatusArray).toHaveBeenCalledWith(
      isQuestionAnswered,
      statusArrayAnsweredMock,
      statusArraySelectedMock,
    );
    expect(getCurrentStatusArray).toHaveReturnedWith(currentStatusArrayMock);
  });
});
