import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SliderMouseUpdateHook } from "@/globals/models/types/SliderMouseTypes.ts";
import useSliderMouseEventUpdate from "@/hooks/slider/subhooks/useSliderMouseEventUpdate.ts";
import {
  CHARACTER_LENGTH_MAX_VALUE,
  CHARACTER_LENGTH_MIN_VALUE,
} from "@/globals/config.ts";
import correctValuesThatAreTooSmall from "@/globals/utils/correctValuesThatAreTooSmall.ts";
import getNewPositionAbsolute from "@/globals/helper/slider/getNewPositionAbsolute.ts";
import isNewPositionValid from "@/globals/utils/isNewPositionValid.ts";
import { ERROR_MESSAGE_SLIDER_MOUSE_UPDATE_PREFIX } from "@/globals/constants/ErrorMessages.ts";

jest.spyOn(console, "error").mockImplementation((): null => null);

const correctValuesThatAreTooSmallMockValue: number =
  CHARACTER_LENGTH_MIN_VALUE;
jest.mock(
  "@/globals/utils/correctValuesThatAreTooSmall.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn((): number => correctValuesThatAreTooSmallMockValue),
  }),
);

const getNewPositionAbsoluteMockValue: number = CHARACTER_LENGTH_MIN_VALUE;
jest.mock(
  "@/globals/helper/slider/getNewPositionAbsolute.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn((): number => getNewPositionAbsoluteMockValue),
  }),
);

const isNewPositionValidMockValue: boolean = true;
jest.mock(
  "@/globals/utils/isNewPositionValid.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn((): boolean => isNewPositionValidMockValue),
  }),
);

const minValue: number = CHARACTER_LENGTH_MIN_VALUE;
const maxValue: number = CHARACTER_LENGTH_MAX_VALUE;
const propagateNewValueMock: jest.Mock = jest.fn();
const onPositionChangeMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { handleClick, containerRef, updatePosition }: SliderMouseUpdateHook =
    useSliderMouseEventUpdate(
      minValue,
      maxValue,
      propagateNewValueMock,
      onPositionChangeMock,
    );

  return (
    <div
      ref={containerRef}
      data-testid={testComponentDataTestId}
      onClick={handleClick}
      onMouseMove={updatePosition}
    ></div>
  );
};

describe("useSliderMouseEventUpdate Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("does not call updatePosition by default", (): void => {
    setup();

    expect(getNewPositionAbsolute).not.toHaveBeenCalled();
    expect(correctValuesThatAreTooSmall).not.toHaveBeenCalled();
    expect(isNewPositionValid).not.toHaveBeenCalled();
    expect(propagateNewValueMock).not.toHaveBeenCalled();
    expect(onPositionChangeMock).not.toHaveBeenCalled();
  });

  it("calls updatePosition when handleClick is triggered", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(getNewPositionAbsolute).toHaveBeenCalled();
    expect(correctValuesThatAreTooSmall).toHaveBeenCalled();
    expect(isNewPositionValid).toHaveBeenCalled();
    expect(propagateNewValueMock).toHaveBeenCalled();
    expect(onPositionChangeMock).toHaveBeenCalled();
  });

  it("calls updatePosition directly", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.mouseMove(element);

    expect(getNewPositionAbsolute).toHaveBeenCalled();
    expect(correctValuesThatAreTooSmall).toHaveBeenCalled();
    expect(isNewPositionValid).toHaveBeenCalled();
    expect(propagateNewValueMock).toHaveBeenCalled();
    expect(onPositionChangeMock).toHaveBeenCalled();
  });

  it("returns isNewPositionValid is false", (): void => {
    (isNewPositionValid as jest.Mock).mockReturnValue(false);
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(propagateNewValueMock).not.toHaveBeenCalled();
    expect(onPositionChangeMock).not.toHaveBeenCalled();
  });

  it("logs errors", (): void => {
    (isNewPositionValid as jest.Mock).mockImplementation((): void => {
      throw new Error();
    });
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      ERROR_MESSAGE_SLIDER_MOUSE_UPDATE_PREFIX,
      expect.any(Error),
    );
  });
});
