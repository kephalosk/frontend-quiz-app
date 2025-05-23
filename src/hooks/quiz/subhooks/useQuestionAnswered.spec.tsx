import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuestionAnsweredHook } from "@/globals/models/types/QuizTypes.ts";
import useQuestionAnswered from "@/hooks/quiz/subhooks/useQuestionAnswered.ts";

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { isQuestionAnswered, setIsQuestionAnswered }: QuestionAnsweredHook =
    useQuestionAnswered();

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => setIsQuestionAnswered(true)}
    >{`${isQuestionAnswered}`}</div>
  );
};

describe("useQuestionAnswered Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("sets isQuestionAnswered", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.textContent).toEqual("false");

    fireEvent.click(element);

    expect(element.textContent).toEqual("true");
  });
});
