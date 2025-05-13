import React from "react";
import { render, screen } from "@testing-library/react";
import useSliderMouseEventListener from "@/hooks/slider/subhooks/useSliderMouseEventListener.ts";

const handleMouseMoveMock: jest.Mock = jest.fn();
const handleMouseUpMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{ isDragging: boolean }> = ({
  isDragging,
}: {
  isDragging: boolean;
}) => {
  useSliderMouseEventListener(
    isDragging,
    handleMouseMoveMock,
    handleMouseUpMock,
  );

  return (
    <div
      data-testid={testComponentDataTestId}
      onMouseMove={handleMouseMoveMock}
      onMouseUp={handleMouseUpMock}
    ></div>
  );
};

describe("useSliderMouseEventListener Hook", (): void => {
  const setup = ({
    isDragging,
  }: {
    isDragging: boolean;
  }): { unmount: () => void } => {
    return render(<TestComponent isDragging={isDragging} />);
  };

  beforeAll((): void => {
    jest.spyOn(document, "addEventListener");
    jest.spyOn(document, "removeEventListener");
  });

  afterAll((): void => {
    jest.restoreAllMocks();
  });

  it("renders component correctly", (): void => {
    setup({ isDragging: true });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toBeInTheDocument();
  });

  it("adds event listeners when isDragging is true", (): void => {
    setup({ isDragging: true });

    expect(document.addEventListener).toHaveBeenCalledTimes(2);
    expect(document.addEventListener).toHaveBeenCalledWith(
      "mousemove",
      handleMouseMoveMock,
    );
    expect(document.addEventListener).toHaveBeenCalledWith(
      "mouseup",
      handleMouseUpMock,
    );
  });

  it("does not add event listeners when isDragging is false", (): void => {
    setup({ isDragging: false });

    expect(document.addEventListener).not.toHaveBeenCalled();
  });

  it("removes event listeners on cleanup", (): void => {
    const { unmount } = setup({ isDragging: true });
    unmount();

    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "mousemove",
      handleMouseMoveMock,
    );
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "mouseup",
      handleMouseUpMock,
    );
  });
});
