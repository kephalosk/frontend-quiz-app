import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useAnswerSelection from "@/hooks/quiz/subhooks/useAnswerSelection.ts";
import { AnswerSelectionHook } from "@/globals/models/types/QuizTypes.ts";

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { isAnswerSelected, setIsAnswerSelected }: AnswerSelectionHook =
    useAnswerSelection();

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => setIsAnswerSelected(true)}
    >{`${isAnswerSelected}`}</div>
  );
};

describe("useAnswerSelection Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("sets isAnswerSelected", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.textContent).toEqual("false");

    fireEvent.click(element);

    expect(element.textContent).toEqual("true");
  });
});
