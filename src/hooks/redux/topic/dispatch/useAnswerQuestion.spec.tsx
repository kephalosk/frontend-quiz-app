import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { answerQuestion } from "@/redux/slices/topicSlice.ts";
import useAnswerQuestion from "@/hooks/redux/topic/dispatch/useAnswerQuestion.ts";

jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock;
  } => ({
    useDispatch: jest.fn(),
  }),
);

jest.mock(
  "@/redux/slices/topicSlice.ts",
  (): {
    answerQuestion: jest.Mock;
  } => ({
    answerQuestion: jest.fn(),
  }),
);

const newValue: { correct: boolean } = { correct: true };
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useAnswerQuestion();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange(newValue)}
    ></div>
  );
};

describe("useAnswerQuestion hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("calls answerQuestion with expected value", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(answerQuestion(newValue));
    expect(dispatchMock).toHaveReturnedWith(undefined);
  });
});
