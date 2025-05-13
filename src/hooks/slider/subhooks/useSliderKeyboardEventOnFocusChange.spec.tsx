import useSliderKeyboardEventOnFocusChange from "@/hooks/slider/subhooks/useSliderKeyboardEventOnFocusChange.ts";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SliderKeyboardFocusHook } from "@/globals/models/types/SliderKeyboardTypes.ts";

const testComponentFocusButton: string = "focus-button";
const testComponentBlurButton: string = "blur-button";
const focusedString: string = "Focused";
const notFocusedString: string = "NotFocused";
const TestComponent: React.FC = () => {
  const { isFocused, onFocusChange }: SliderKeyboardFocusHook =
    useSliderKeyboardEventOnFocusChange();

  return (
    <div>
      <button
        data-testid={testComponentFocusButton}
        onClick={() => onFocusChange(true)}
      >
        {isFocused ? focusedString : notFocusedString}
      </button>
      <button
        data-testid={testComponentBlurButton}
        onClick={() => onFocusChange(false)}
      >
        {isFocused ? focusedString : notFocusedString}
      </button>
    </div>
  );
};

describe("useSliderKeyboardEventOnFocusChange Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("sets isFocused to true when Set Focus button is clicked", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentFocusButton);
    fireEvent.click(element);

    expect(element.innerHTML).toEqual(focusedString);
  });

  it("sets isFocused to false when Remove Focus button is clicked", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentBlurButton);
    fireEvent.click(element);

    expect(element.innerHTML).toEqual(notFocusedString);
  });
});
