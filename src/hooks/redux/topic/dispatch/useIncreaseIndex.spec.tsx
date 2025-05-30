import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { increaseIndex } from "@/redux/slices/topicSlice.ts";
import useIncreaseIndex from "@/hooks/redux/topic/dispatch/useIncreaseIndex.ts";

jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock;
  } => ({
    useDispatch: jest.fn(),
  }),
);

jest.mock(
  "@/redux/slices/topicSlice.ts",
  (): {
    increaseIndex: jest.Mock;
  } => ({
    increaseIndex: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useIncreaseIndex();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange()}
    ></div>
  );
};

describe("useIncreaseIndex hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("calls answerQuestion with expected value", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(increaseIndex());
    expect(dispatchMock).toHaveReturnedWith(undefined);
  });
});
