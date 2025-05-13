import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useSliderPosition from "@/hooks/slider/useSliderPosition.ts";
import {
  CHARACTER_LENGTH_MAX_VALUE,
  CHARACTER_LENGTH_MIN_VALUE,
} from "@/globals/config.ts";
import { SliderPositionHook } from "@/globals/models/types/SliderPositionTypes.ts";

const currentValueMock: number = CHARACTER_LENGTH_MIN_VALUE;
const maxValueMock: number = CHARACTER_LENGTH_MAX_VALUE;
const positionChangedPercent: number = 100;

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { positionPercent, onPositionChange }: SliderPositionHook =
    useSliderPosition(currentValueMock, maxValueMock);

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => onPositionChange(positionChangedPercent)}
    >
      {positionPercent}
    </div>
  );
};

describe("useSliderPosition Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("returns positionPercent", (): void => {
    const expectedPercentage: number = (currentValueMock / maxValueMock) * 100;
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.innerHTML).toEqual(`${expectedPercentage}`);
  });

  it("calls onPositionChange to set new percentage", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element.innerHTML).toEqual(`${positionChangedPercent}`);
  });
});
