import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SliderMouseOnDraggingChangeHook } from "@/globals/models/types/SliderMouseTypes.ts";
import useSliderMouseEventOnDraggingChange from "@/hooks/slider/subhooks/useSliderMouseEventOnDraggingChange.ts";

const testComponentDataTestId: string = "test-component";
const draggingDataTestId: string = "dragging";
const TestComponent: React.FC = () => {
  const { isDragging, onDraggingChange }: SliderMouseOnDraggingChangeHook =
    useSliderMouseEventOnDraggingChange();

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => onDraggingChange(!isDragging)}
    >
      {isDragging && <div data-testid={draggingDataTestId}></div>}
    </div>
  );
};

describe("useSliderMouseEventOnDraggingChange Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("sets isDragging to false by default", (): void => {
    setup();

    const element: HTMLElement | null =
      screen.queryByTestId(draggingDataTestId);

    expect(element).not.toBeInTheDocument();
  });

  it("it sets isDragging to true when onDraggingChange is triggered with true", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    const draggingElement: HTMLElement = screen.getByTestId(draggingDataTestId);
    expect(draggingElement).toBeInTheDocument();
  });

  it("it sets isDragging back to false when onDraggingChange is triggered with false", async (): Promise<void> => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    const draggingElementFirst: HTMLElement =
      screen.getByTestId(draggingDataTestId);
    expect(draggingElementFirst).toBeInTheDocument();

    fireEvent.click(element);

    const draggingElementSecond: HTMLElement | null =
      screen.queryByTestId(draggingDataTestId);
    expect(draggingElementSecond).not.toBeInTheDocument();
  });
});
