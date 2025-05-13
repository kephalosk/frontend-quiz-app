import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SliderMouseMouseMoveHook } from "@/globals/models/types/SliderMouseTypes.ts";
import useSliderMouseEventMouseMove from "@/hooks/slider/subhooks/useSliderMouseEventMouseMove.ts";

const clearTimeoutIdMock: jest.Mock = jest.fn();
const updatePositionMock: jest.Mock = jest.fn();
const setTimeoutIdMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{ isDragging: boolean }> = ({ isDragging }) => {
  const { handleMouseMove }: SliderMouseMouseMoveHook =
    useSliderMouseEventMouseMove(
      isDragging,
      clearTimeoutIdMock,
      updatePositionMock,
      setTimeoutIdMock,
    );

  return (
    <div
      data-testid={testComponentDataTestId}
      onMouseMove={handleMouseMove}
    ></div>
  );
};

describe("useSliderMouseEventMouseMove Hook", (): void => {
  const setup = (props: { isDragging: boolean }): void => {
    render(<TestComponent isDragging={props.isDragging} />);
  };

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("does not call clearTimeoutId, updatePosition, setTimeoutId if isDragging is false", (): void => {
    setup({ isDragging: false });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.mouseMove(element);

    expect(clearTimeoutIdMock).not.toHaveBeenCalled();
    expect(updatePositionMock).not.toHaveBeenCalled();
    expect(setTimeoutIdMock).not.toHaveBeenCalled();
  });

  it("calls clearTimeoutId, updatePosition, setTimeoutId if isDragging is true", (): void => {
    const expectedTimeoutId: number = 1000000000000;
    const onMouseMoveEvent: string = "onMouseMove";
    setup({ isDragging: true });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.mouseMove(element);

    jest.runAllTimers();

    expect(clearTimeoutIdMock).toHaveBeenCalledTimes(1);
    expect(clearTimeoutIdMock).toHaveBeenCalledWith();
    expect(updatePositionMock).toHaveBeenCalled();
    expect(updatePositionMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: onMouseMoveEvent }),
    );
    expect(setTimeoutIdMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutIdMock).toHaveBeenCalledWith(expectedTimeoutId);
  });
});
