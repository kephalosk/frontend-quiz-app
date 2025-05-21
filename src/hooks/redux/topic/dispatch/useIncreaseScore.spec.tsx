import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { increaseScore } from "@/redux/slices/topicSlice.ts";
import useIncreaseScore from "@/hooks/redux/topic/dispatch/useIncreaseScore.ts";

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
    increaseScore: jest.Mock;
  } => ({
    increaseScore: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useIncreaseScore();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange()}
    ></div>
  );
};

describe("useIncreaseScore hook", (): void => {
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
    expect(dispatchMock).toHaveBeenCalledWith(increaseScore());
    expect(dispatchMock).toHaveReturnedWith(undefined);
  });
});
