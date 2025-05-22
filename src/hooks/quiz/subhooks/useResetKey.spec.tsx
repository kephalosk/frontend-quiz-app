import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ResetKeyHook } from "@/globals/models/types/QuizTypes.ts";
import useResetKey from "@/hooks/quiz/subhooks/useResetKey.ts";

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { resetKey, resetStatusArray }: ResetKeyHook = useResetKey();

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => resetStatusArray()}
    >{`${resetKey}`}</div>
  );
};

describe("useResetKey Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("increases key value if resetStatusArray is called", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.innerHTML).toEqual("0");

    fireEvent.click(element);

    expect(element.innerHTML).toEqual("1");
  });
});
