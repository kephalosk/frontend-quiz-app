import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useSliderMouseEventMouseDown from "@/hooks/slider/subhooks/useSliderMouseEventMouseDown.ts";
import { SliderMouseMouseDownHook } from "@/globals/models/types/SliderMouseTypes.ts";

const onDraggingChangeMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { handleMouseDown }: SliderMouseMouseDownHook =
    useSliderMouseEventMouseDown(onDraggingChangeMock);

  return (
    <div
      data-testid={testComponentDataTestId}
      onMouseDown={handleMouseDown}
    ></div>
  );
};

describe("useSliderMouseEventMouseDown Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("does not call onDraggingChange by default", (): void => {
    setup();

    expect(onDraggingChangeMock).not.toHaveBeenCalled();
  });

  it("calls onDraggingChange with true when handleMouseDown is triggered", (): void => {
    const expectedDraggingChangeBoolean: boolean = true;
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.mouseDown(element);

    expect(onDraggingChangeMock).toHaveBeenCalledTimes(1);
    expect(onDraggingChangeMock).toHaveBeenCalledWith(
      expectedDraggingChangeBoolean,
    );
  });
});
