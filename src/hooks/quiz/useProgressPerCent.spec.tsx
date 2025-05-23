import React from "react";
import { render, screen } from "@testing-library/react";
import useProgressPerCent from "@/hooks/quiz/useProgressPerCent.ts";

const currentIndexMock: number = 4;
const totalQuestionsMock: number = 10;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const progressPerCent: number = useProgressPerCent({
    currentIndex: currentIndexMock,
    totalQuestions: totalQuestionsMock,
  });

  return <div data-testid={testComponentDataTestId}>{progressPerCent}</div>;
};

describe("useProgressPerCent Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("returns number for progressPerCent", (): void => {
    const expected: number = 50;
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.textContent).toEqual(`${expected}`);
  });
});
