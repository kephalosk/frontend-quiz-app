import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockedRefObjectDiv } from "@/jest/fixtures/RefObjectFixtures.ts";
import useSliderMouseEvents from "@/hooks/slider/useSliderMouseEvents.ts";
import { SliderMouseHook } from "@/globals/models/types/SliderMouseTypes.ts";
import useSliderMouseEventOnDraggingChange from "@/hooks/slider/subhooks/useSliderMouseEventOnDraggingChange.ts";
import useSliderMouseEventTimeout from "@/hooks/slider/subhooks/useSliderMouseEventTimeout.ts";
import useSliderMouseEventUpdate from "@/hooks/slider/subhooks/useSliderMouseEventUpdate.ts";
import useSliderMouseEventMouseDown from "@/hooks/slider/subhooks/useSliderMouseEventMouseDown.ts";
import useSliderMouseEventMouseUp from "@/hooks/slider/subhooks/useSliderMouseEventMouseUp.ts";
import useSliderMouseEventMouseMove from "@/hooks/slider/subhooks/useSliderMouseEventMouseMove.ts";
import useSliderMouseEventListener from "@/hooks/slider/subhooks/useSliderMouseEventListener.ts";

const setTimeoutIdMock: jest.Mock = jest.fn();
const clearTimeoutIdMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderMouseEventTimeout.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      setTimeoutId: setTimeoutIdMock,
      clearTimeoutId: clearTimeoutIdMock,
    })),
  }),
);

const isDraggingMock: boolean = true;
const onDraggingChangeMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderMouseEventOnDraggingChange.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      isDragging: isDraggingMock,
      onDraggingChange: onDraggingChangeMock,
    })),
  }),
);

const handleClickMock: jest.Mock = jest.fn();
const containerRefMock: React.RefObject<HTMLDivElement | null> =
  mockedRefObjectDiv;
const updatePositionMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderMouseEventUpdate.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      handleClick: handleClickMock,
      containerRef: containerRefMock,
      updatePosition: updatePositionMock,
    })),
  }),
);

const handleMouseDownMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderMouseEventMouseDown.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      handleMouseDown: handleMouseDownMock,
    })),
  }),
);

const handleMouseUpMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderMouseEventMouseUp.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      handleMouseUp: handleMouseUpMock,
    })),
  }),
);

const handleMouseMoveMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/slider/subhooks/useSliderMouseEventMouseMove.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => ({
      handleMouseMove: handleMouseMoveMock,
    })),
  }),
);

jest.mock(
  "@/hooks/slider/subhooks/useSliderMouseEventListener.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const minValue: number = 50;
const maxValue: number = 0;
const propagateNewValueMock: jest.Mock = jest.fn();
const onPositionChangeMock: jest.Mock = jest.fn();

const draggedString: string = "Dragged";
const notDraggedString: string = "NotDragged";

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const {
    isDragging,
    handleMouseDown,
    handleClick,
    containerRef,
  }: SliderMouseHook = useSliderMouseEvents(
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
      onMouseDown={handleMouseDown}
    >
      {isDragging ? draggedString : notDraggedString}
    </div>
  );
};

describe("useSliderMouseEvents Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("sets isDragged correctly", () => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.innerHTML).toEqual(draggedString);
    expect(useSliderMouseEventOnDraggingChange).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEventOnDraggingChange).toHaveBeenCalledWith();
    expect(useSliderMouseEventOnDraggingChange).toHaveReturnedWith({
      isDragging: isDraggingMock,
      onDraggingChange: onDraggingChangeMock,
    });
  });

  it("calls handleMouseDown when MouseDown is clicked", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.mouseDown(element);

    expect(handleMouseDownMock).toHaveBeenCalledTimes(1);
    expect(handleMouseDownMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: "onMouseDown" }),
    );
    expect(useSliderMouseEventMouseDown).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEventMouseDown).toHaveBeenCalledWith(
      onDraggingChangeMock,
    );
    expect(useSliderMouseEventMouseDown).toHaveReturnedWith({
      handleMouseDown: handleMouseDownMock,
    });
  });

  it("calls handleClick when clicked", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: "onClick" }),
    );
    expect(useSliderMouseEventUpdate).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEventUpdate).toHaveBeenCalledWith(
      minValue,
      maxValue,
      propagateNewValueMock,
      onPositionChangeMock,
    );
    expect(useSliderMouseEventUpdate).toHaveReturnedWith({
      handleClick: handleClickMock,
      containerRef: containerRefMock,
      updatePosition: updatePositionMock,
    });
  });

  it("sets containerRef", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(containerRefMock.current).toBe(element);
    expect(useSliderMouseEventUpdate).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEventUpdate).toHaveBeenCalledWith(
      minValue,
      maxValue,
      propagateNewValueMock,
      onPositionChangeMock,
    );
    expect(useSliderMouseEventUpdate).toHaveReturnedWith({
      handleClick: handleClickMock,
      containerRef: containerRefMock,
      updatePosition: updatePositionMock,
    });
  });

  it("calls transitive private subhook useSliderMouseEventTimeout", (): void => {
    setup();

    expect(useSliderMouseEventTimeout).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEventTimeout).toHaveBeenCalledWith();
    expect(useSliderMouseEventTimeout).toHaveReturnedWith({
      setTimeoutId: setTimeoutIdMock,
      clearTimeoutId: clearTimeoutIdMock,
    });
  });

  it("calls transitive private subhook useSliderMouseEventMouseUp", (): void => {
    setup();

    expect(useSliderMouseEventMouseUp).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEventMouseUp).toHaveBeenCalledWith(
      onDraggingChangeMock,
      clearTimeoutIdMock,
    );
    expect(useSliderMouseEventMouseUp).toHaveReturnedWith({
      handleMouseUp: handleMouseUpMock,
    });
  });

  it("calls transitive private subhook useSliderMouseEventMouseMove", (): void => {
    setup();

    expect(useSliderMouseEventMouseMove).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEventMouseMove).toHaveBeenCalledWith(
      isDraggingMock,
      clearTimeoutIdMock,
      updatePositionMock,
      setTimeoutIdMock,
    );
    expect(useSliderMouseEventMouseMove).toHaveReturnedWith({
      handleMouseMove: handleMouseMoveMock,
    });
  });

  it("calls transitive private subhook useSliderMouseEventListener", (): void => {
    setup();

    expect(useSliderMouseEventListener).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEventListener).toHaveBeenCalledWith(
      isDraggingMock,
      handleMouseMoveMock,
      handleMouseUpMock,
    );
    expect(useSliderMouseEventListener).toHaveReturnedWith();
  });
});
