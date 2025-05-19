import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { setQuizStatus } from "@/redux/slices/topicSlice.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";
import useUpdateQuizStatus from "@/hooks/redux/topic/dispatch/useUpdateQuizStatus.ts";

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
    setQuizStatus: jest.Mock;
  } => ({
    setQuizStatus: jest.fn(),
  }),
);

const newValue: LoadingStateEnum = LoadingStateEnum.IDLE;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useUpdateQuizStatus();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange(newValue)}
    ></div>
  );
};

describe("useUpdateQuizStatus hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("calls setQuizStatus with expected value", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(setQuizStatus(newValue));
    expect(dispatchMock).toHaveReturnedWith(undefined);
  });
});
