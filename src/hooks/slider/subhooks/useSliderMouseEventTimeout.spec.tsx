import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SliderMouseTimeoutHook } from "@/globals/models/types/SliderMouseTypes.ts";
import useSliderMouseEventTimeout from "@/hooks/slider/subhooks/useSliderMouseEventTimeout.ts";

const mockedTimeoutId: NodeJS.Timeout = {} as NodeJS.Timeout;

const testComponentDataTestIdSetTimeoutId: string =
  "test-component-set-timeout-id";
const testComponentDataTestIdClearTimeoutId: string =
  "test-component-clear-timeout-id";
const TestComponent: React.FC = () => {
  const { setTimeoutId, clearTimeoutId }: SliderMouseTimeoutHook =
    useSliderMouseEventTimeout();

  return (
    <>
      <div
        data-testid={testComponentDataTestIdSetTimeoutId}
        onClick={() => setTimeoutId(mockedTimeoutId)}
      ></div>
      <div
        data-testid={testComponentDataTestIdClearTimeoutId}
        onClick={clearTimeoutId}
      ></div>
    </>
  );
};

describe("useSliderMouseEventTimeout Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  beforeAll(() => {
    jest.spyOn(global, "clearTimeout");
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("calls clearTimeout when clearTimeoutId is triggered", (): void => {
    setup();

    const setTimeoutElement: HTMLElement = screen.getByTestId(
      testComponentDataTestIdSetTimeoutId,
    );
    fireEvent.click(setTimeoutElement);

    const clearTimeoutElement: HTMLElement = screen.getByTestId(
      testComponentDataTestIdClearTimeoutId,
    );
    fireEvent.click(clearTimeoutElement);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledWith(mockedTimeoutId);
  });

  it("does not call clearTimeout if no timeoutId is set", (): void => {
    setup();

    const clearTimeoutElement: HTMLElement = screen.getByTestId(
      testComponentDataTestIdClearTimeoutId,
    );
    fireEvent.click(clearTimeoutElement);

    expect(clearTimeout).not.toHaveBeenCalled();
  });
});
