import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SliderMouseMouseUpHook } from "@/globals/models/types/SliderMouseTypes.ts";
import useSliderMouseEventMouseUp from "@/hooks/slider/subhooks/useSliderMouseEventMouseUp.ts";

const onDraggingChangeMock: jest.Mock = jest.fn();
const clearTimeoutIdMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { handleMouseUp }: SliderMouseMouseUpHook = useSliderMouseEventMouseUp(
    onDraggingChangeMock,
    clearTimeoutIdMock,
  );

  return (
    <div data-testid={testComponentDataTestId} onMouseUp={handleMouseUp}></div>
  );
};

describe("useSliderMouseEventMouseUp Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("does not call onDraggingChange by default", (): void => {
    setup();

    expect(onDraggingChangeMock).not.toHaveBeenCalled();
  });

  it("does not call clearTimeoutId by default", (): void => {
    setup();

    expect(clearTimeoutIdMock).not.toHaveBeenCalled();
  });

  it("calls onDraggingChange with false when handleMouseUp is triggered", (): void => {
    const expectedDraggingChangeBoolean: boolean = false;
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.mouseUp(element);

    expect(onDraggingChangeMock).toHaveBeenCalledTimes(1);
    expect(onDraggingChangeMock).toHaveBeenCalledWith(
      expectedDraggingChangeBoolean,
    );
  });

  it("calls clearTimeoutId hen handleMouseUp is triggered", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.mouseUp(element);

    expect(clearTimeoutIdMock).toHaveBeenCalledTimes(1);
    expect(clearTimeoutIdMock).toHaveBeenCalledWith();
  });
});
