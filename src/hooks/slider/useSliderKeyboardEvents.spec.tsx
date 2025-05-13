import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SliderKeyboardHook } from "@/globals/models/types/SliderKeyboardTypes.ts";
import useSliderKeyboardEvents from "@/hooks/slider/useSliderKeyboardEvents.ts";
import useSliderKeyboardEventOnFocusChange from "@/hooks/slider/subhooks/useSliderKeyboardEventOnFocusChange.ts";
import useSliderKeyboardEventKeyDown from "@/hooks/slider/subhooks/useSliderKeyboardEventKeyDown.ts";
import useSliderKeyboardEventKeyUp from "@/hooks/slider/subhooks/useSliderKeyboardEventKeyUp.ts";

const isFocusChangeMock: boolean = true;
const onFocusChangeMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderKeyboardEventOnFocusChange.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      isFocused: isFocusChangeMock,
      onFocusChange: onFocusChangeMock,
    })),
  }),
);

const handleKeyDownMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderKeyboardEventKeyDown.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      handleKeyDown: handleKeyDownMock,
    })),
  }),
);

const handleKeyUpMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderKeyboardEventKeyUp.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      handleKeyUp: handleKeyUpMock,
    })),
  }),
);

const currentValueMock: number = 50;
const minValueMock: number = 0;
const maxValueMock: number = 100;
const propagateNewValueMock: jest.Mock = jest.fn();
const onPositionChangeMock: jest.Mock = jest.fn();

const focusedString: string = "Focused";
const notFocusedString: string = "NotFocused";

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const {
    handleKeyDown,
    handleKeyUp,
    isFocused,
    onFocusChange,
  }: SliderKeyboardHook = useSliderKeyboardEvents(
    currentValueMock,
    minValueMock,
    maxValueMock,
    propagateNewValueMock,
    onPositionChangeMock,
  );

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => onFocusChange(isFocusChangeMock)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0}
    >
      {isFocused ? focusedString : notFocusedString}
    </div>
  );
};

describe("useSliderKeyboardEvents Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("sets isFocused correctly", () => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.innerHTML).toEqual(focusedString);
    expect(useSliderKeyboardEventOnFocusChange).toHaveBeenCalledTimes(1);
  });

  it("calls onFocusChange when clicked", () => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(onFocusChangeMock).toHaveBeenCalledTimes(1);
    expect(onFocusChangeMock).toHaveBeenCalledWith(isFocusChangeMock);
    expect(useSliderKeyboardEventOnFocusChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleKeyDown when a key is pressed", () => {
    setup();
    expect(handleKeyDownMock).toHaveBeenCalledTimes(0);

    const eventKey: { key: string } = { key: "ArrowLeft" };
    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.keyDown(element, eventKey);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
    expect(handleKeyDownMock).toHaveBeenCalledWith(
      expect.objectContaining(eventKey),
    );
    expect(useSliderKeyboardEventKeyDown).toHaveBeenCalledTimes(1);
  });

  it("calls handleKeyUp when keyUp event occurs", () => {
    setup();
    expect(handleKeyUpMock).toHaveBeenCalledTimes(0);

    const eventKey: { key: string } = { key: "ArrowLeft" };
    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.keyUp(element, eventKey);

    expect(handleKeyUpMock).toHaveBeenCalledTimes(1);
    expect(handleKeyUpMock).toHaveBeenCalledWith(
      expect.objectContaining(eventKey),
    );
    expect(useSliderKeyboardEventKeyUp).toHaveBeenCalledTimes(1);
  });
});
