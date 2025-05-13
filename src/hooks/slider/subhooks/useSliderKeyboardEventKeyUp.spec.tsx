import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useSliderKeyboardEventKeyUp from "@/hooks/slider/subhooks/useSliderKeyboardEventKeyUp.ts";
import { SliderKeyboardKeyUpHook } from "@/globals/models/types/SliderKeyboardTypes.ts";

const testComponentDataTestId: string = "test-component";
const onFocusChangeMock: jest.Mock = jest.fn();
const TestComponent: React.FC = () => {
  const { handleKeyUp }: SliderKeyboardKeyUpHook =
    useSliderKeyboardEventKeyUp(onFocusChangeMock);

  return (
    <div data-testid={testComponentDataTestId} onClick={handleKeyUp}></div>
  );
};

describe("useSliderKeyboardEventKeyUp Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  beforeEach((): void => {
    onFocusChangeMock.mockClear();
  });

  it("calls onFocusChange with false when handleKeyUp is triggered", (): void => {
    setup();

    fireEvent.click(screen.getByTestId(testComponentDataTestId));

    expect(onFocusChangeMock).toHaveBeenCalledTimes(1);
    expect(onFocusChangeMock).toHaveBeenCalledWith(false);
  });
});
