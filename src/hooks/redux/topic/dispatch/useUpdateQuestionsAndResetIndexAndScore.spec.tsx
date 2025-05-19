import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { setQuestionsAndResetIndexAndScore } from "@/redux/slices/topicSlice.ts";
import useUpdateQuestionsAndResetIndexAndScore from "@/hooks/redux/topic/dispatch/useUpdateQuestionsAndResetIndexAndScore.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";

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
    setQuestionsAndResetIndexAndScore: jest.Mock;
  } => ({
    setQuestionsAndResetIndexAndScore: jest.fn(),
  }),
);

const newValue: EPQuestion[] = mockedQuestions;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useUpdateQuestionsAndResetIndexAndScore();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange(newValue)}
    ></div>
  );
};

describe("useUpdateQuestionsAndResetIndexAndScore hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("calls setQuestionsAndResetIndexAndScore with expected value", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      setQuestionsAndResetIndexAndScore(newValue),
    );
    expect(dispatchMock).toHaveReturnedWith(undefined);
  });
});
