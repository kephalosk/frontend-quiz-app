import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SliderKeyboardKeyDownHook } from "@/globals/models/types/SliderKeyboardTypes.ts";
import useSliderKeyboardEventKeyDown from "@/hooks/slider/subhooks/useSliderKeyboardEventKeyDown.ts";
import isCharacterLengthGoingOutOfBounce from "@/globals/helper/slider/isCharacterLengthGoingOutOfBounce.ts";
import setNewPosition from "@/globals/helper/slider/setNewPosition.ts";
import { ERROR_MESSAGE_SLIDER_KEYBOARD_KEYDOWN_PREFIX } from "@/globals/constants/ErrorMessages.ts";

jest.spyOn(console, "error").mockImplementation((): null => null);

jest.mock(
  "@/globals/helper/slider/isCharacterLengthGoingOutOfBounce.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/slider/setNewPosition.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const currentValueMock: number = 50;
const minValueMock: number = 0;
const maxValueMock: number = 100;
const propagateNewValueMock: jest.Mock = jest.fn();
const onPositionChangeMock: jest.Mock = jest.fn();
const onFocusChangeMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { handleKeyDown }: SliderKeyboardKeyDownHook =
    useSliderKeyboardEventKeyDown(
      currentValueMock,
      minValueMock,
      maxValueMock,
      propagateNewValueMock,
      onPositionChangeMock,
      onFocusChangeMock,
    );

  return (
    <div
      data-testid={testComponentDataTestId}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
        handleKeyDown(event)
      }
    ></div>
  );
};

describe("useSliderKeyboardEventKeyDown Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const isCharacterLengthGoingOutOfBounceMock: boolean = false;

  beforeEach((): void => {
    (isCharacterLengthGoingOutOfBounce as jest.Mock).mockReturnValue(
      isCharacterLengthGoingOutOfBounceMock,
    );
  });

  it("returns if event.key is either ArrowLeft nor ArrowRight", (): void => {
    setup();

    const invalidKeyEvent: { key: string } = { key: "ArrowUp" };
    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.keyDown(element, invalidKeyEvent);

    expect(isCharacterLengthGoingOutOfBounce).not.toHaveBeenCalled();
    expect(setNewPosition).not.toHaveBeenCalled();
  });

  it("returns if isCharacterLengthGoingOutOfBounce returns true", (): void => {
    (isCharacterLengthGoingOutOfBounce as jest.Mock).mockReturnValue(true);
    setup();

    const validKeyEvent: { key: string } = { key: "ArrowLeft" };
    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.keyDown(element, validKeyEvent);

    expect(isCharacterLengthGoingOutOfBounce).toHaveBeenCalledTimes(1);
    expect(isCharacterLengthGoingOutOfBounce).toHaveBeenCalledWith(
      expect.objectContaining(validKeyEvent),
      currentValueMock,
      minValueMock,
      maxValueMock,
    );
    expect(setNewPosition).not.toHaveBeenCalled();
  });

  it.each([
    ["ArrowLeft", currentValueMock - 1],
    ["ArrowRight", currentValueMock + 1],
  ])("sets new Position for %s", (key: string, newPosition: number): void => {
    setup();

    const validKeyEvent: { key: string } = { key };
    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.keyDown(element, validKeyEvent);

    expect(isCharacterLengthGoingOutOfBounce).toHaveBeenCalledTimes(1);
    expect(isCharacterLengthGoingOutOfBounce).toHaveBeenCalledWith(
      expect.objectContaining(validKeyEvent),
      currentValueMock,
      minValueMock,
      maxValueMock,
    );
    expect(setNewPosition).toHaveBeenCalledTimes(1);
    expect(setNewPosition).toHaveBeenCalledWith(
      newPosition,
      maxValueMock,
      propagateNewValueMock,
      onPositionChangeMock,
    );
  });

  it("logs thrown errors", (): void => {
    (isCharacterLengthGoingOutOfBounce as jest.Mock).mockImplementation(
      (): void => {
        throw new Error();
      },
    );

    setup();

    const validKeyEvent: { key: string } = { key: "ArrowLeft" };
    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.keyDown(element, validKeyEvent);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      ERROR_MESSAGE_SLIDER_KEYBOARD_KEYDOWN_PREFIX,
      expect.any(Error),
    );
  });
});
