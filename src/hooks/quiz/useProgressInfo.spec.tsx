import React from "react";
import { render, screen } from "@testing-library/react";
import useProgressInfo from "@/hooks/quiz/useProgressInfo.ts";

const currentIndexMock: number = 0;
const totalQuestionsMock: number = 10;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const progressInfo: string = useProgressInfo({
    currentIndex: currentIndexMock,
    totalQuestions: totalQuestionsMock,
  });

  return <div data-testid={testComponentDataTestId}>{progressInfo}</div>;
};

describe("useProgressInfo Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("returns string for progressInfo", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.textContent).toEqual(
      `Question ${currentIndexMock + 1} of ${totalQuestionsMock}`,
    );
  });
});
