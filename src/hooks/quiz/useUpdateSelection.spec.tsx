import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import useUpdateSelection from "@/hooks/quiz/useUpdateSelection.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";
import { UpdateSelectionHook } from "@/globals/models/types/QuizTypes.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import getIndexByQuestionPosition from "@/globals/helper/getIndexByQuestionPosition.ts";
import getIndexOfCorrectPositionInCurrentQuestion from "@/globals/helper/getIndexOfCorrectPositionInCurrentQuestion.ts";
import { DefaultQuestionStatusArray } from "@/globals/constants/DefaultQuestionStatusArray.ts";

jest.mock(
  "@/globals/helper/getIndexByQuestionPosition.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/getIndexOfCorrectPositionInCurrentQuestion.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const currentQuestionMock: EPQuestion = mockedQuestions[0];
const propagateCorrectSelectionMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const testComponentDataTestIdSelected: string = "test-component-selected";
const testComponentDataTestIdAnswered: string = "test-component-answered";
const TestComponent: React.FC<{
  answer: string;
  positionClicked: QuestionPositionEnum;
  resetKey: number;
}> = ({ answer, positionClicked, resetKey }) => {
  const {
    statusArraySelected,
    statusArrayAnswered,
    handleSelection,
  }: UpdateSelectionHook = useUpdateSelection(
    currentQuestionMock,
    propagateCorrectSelectionMock,
    resetKey,
  );

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleSelection(answer, positionClicked)}
    >
      <div data-testid={testComponentDataTestIdSelected}>
        {JSON.stringify(statusArraySelected)}
      </div>
      <div data-testid={testComponentDataTestIdAnswered}>
        {JSON.stringify(statusArrayAnswered)}
      </div>
    </div>
  );
};

describe("useUpdateSelection Hook", (): void => {
  const answer: string = currentQuestionMock.answer;
  const positionClicked: QuestionPositionEnum = QuestionPositionEnum.A;
  const resetKey: number = 0;

  const setup = (
    propsOverride?: Partial<{
      answer: string;
      positionClicked: QuestionPositionEnum;
      resetKey: number;
    }>,
  ): void => {
    const defaultProps: {
      answer: string;
      positionClicked: QuestionPositionEnum;
      resetKey: number;
    } = {
      answer,
      positionClicked,
      resetKey,
    };
    const props: {
      answer: string;
      positionClicked: QuestionPositionEnum;
      resetKey: number;
    } = { ...defaultProps, ...propsOverride };
    render(<TestComponent {...props} />);
  };

  const indexClickedMock: number = 0;
  const indexCorrectedMock: number = 0;

  beforeEach((): void => {
    (getIndexByQuestionPosition as jest.Mock).mockReturnValue(indexClickedMock);
    (getIndexOfCorrectPositionInCurrentQuestion as jest.Mock).mockReturnValue(
      indexCorrectedMock,
    );
  });

  it("returns updated StatusArraySelected as expected when handleSelection is called", (): void => {
    const expectedStatusArraySelected: QuestionStatusEnum[] = [
      QuestionStatusEnum.SELECTED,
      QuestionStatusEnum.DEFAULT,
      QuestionStatusEnum.DEFAULT,
      QuestionStatusEnum.DEFAULT,
    ];
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    const elementSelected: HTMLElement = screen.getByTestId(
      testComponentDataTestIdSelected,
    );
    expect(elementSelected.innerHTML).toEqual(
      JSON.stringify(expectedStatusArraySelected),
    );
  });

  it("returns updated StatusArrayAnswered as expected for correct answer when handleSelection is called", (): void => {
    const expectedStatusArrayAnswered: QuestionStatusEnum[] = [
      QuestionStatusEnum.RIGHT,
      QuestionStatusEnum.DEFAULT,
      QuestionStatusEnum.DEFAULT,
      QuestionStatusEnum.DEFAULT,
    ];
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    const elementAnswered: HTMLElement = screen.getByTestId(
      testComponentDataTestIdAnswered,
    );
    expect(elementAnswered.innerHTML).toEqual(
      JSON.stringify(expectedStatusArrayAnswered),
    );
  });

  it("returns updated StatusArrayAnswered as expected for wrong answer when handleSelection is called", (): void => {
    const expectedStatusArrayAnswered: QuestionStatusEnum[] = [
      QuestionStatusEnum.CORRECTED,
      QuestionStatusEnum.WRONG,
      QuestionStatusEnum.DEFAULT,
      QuestionStatusEnum.DEFAULT,
    ];
    (getIndexByQuestionPosition as jest.Mock).mockReturnValue(1);
    setup({ answer: "wrong answer" });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    const elementAnswered: HTMLElement = screen.getByTestId(
      testComponentDataTestIdAnswered,
    );
    expect(elementAnswered.innerHTML).toEqual(
      JSON.stringify(expectedStatusArrayAnswered),
    );
  });

  it("calls getIndexByQuestionPosition", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(getIndexByQuestionPosition).toHaveBeenCalledTimes(1);
    expect(getIndexByQuestionPosition).toHaveBeenCalledWith(positionClicked);
    expect(getIndexByQuestionPosition).toHaveReturnedWith(indexClickedMock);
  });

  it("calls getIndexOfCorrectPositionInCurrentQuestion for wrong answer", (): void => {
    setup({ answer: "wrong answer" });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(getIndexOfCorrectPositionInCurrentQuestion).toHaveBeenCalledTimes(1);
    expect(getIndexOfCorrectPositionInCurrentQuestion).toHaveBeenCalledWith(
      currentQuestionMock,
    );
    expect(getIndexOfCorrectPositionInCurrentQuestion).toHaveReturnedWith(
      indexCorrectedMock,
    );
  });

  it("does not call getIndexOfCorrectPositionInCurrentQuestion for right answer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(getIndexOfCorrectPositionInCurrentQuestion).not.toHaveBeenCalled();
  });

  it("resets both status arrays when resetKey changes", (): void => {
    const expectedDefault = JSON.stringify(DefaultQuestionStatusArray);
    let resetKey = 0;

    const { rerender } = render(
      <TestComponent
        answer={answer}
        positionClicked={positionClicked}
        resetKey={resetKey}
      />,
    );

    fireEvent.click(screen.getByTestId(testComponentDataTestId));
    const mutatedSelected = screen.getByTestId(
      testComponentDataTestIdSelected,
    ).innerHTML;
    const mutatedAnswered = screen.getByTestId(
      testComponentDataTestIdAnswered,
    ).innerHTML;

    expect(mutatedSelected).not.toEqual(expectedDefault);
    expect(mutatedAnswered).not.toEqual(expectedDefault);

    resetKey++;
    rerender(
      <TestComponent
        answer={answer}
        positionClicked={positionClicked}
        resetKey={resetKey}
      />,
    );

    const resetSelected = screen.getByTestId(
      testComponentDataTestIdSelected,
    ).innerHTML;
    const resetAnswered = screen.getByTestId(
      testComponentDataTestIdAnswered,
    ).innerHTML;

    expect(resetSelected).toEqual(expectedDefault);
    expect(resetAnswered).toEqual(expectedDefault);
  });
});
