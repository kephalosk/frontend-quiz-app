import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { setQuizError } from "@/redux/slices/topicSlice.ts";
import useUpdateQuizError from "@/hooks/redux/topic/dispatch/useUpdateQuizError.ts";
import { UNKNOWN_ERROR_MESSAGE } from "@/globals/constants/ErrorMessages.ts";

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
    setQuizError: jest.Mock;
  } => ({
    setQuizError: jest.fn(),
  }),
);

const newValue: string = UNKNOWN_ERROR_MESSAGE;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useUpdateQuizError();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange(newValue)}
    ></div>
  );
};

describe("useUpdateQuizError hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("calls setQuizError with expected value", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(setQuizError(newValue));
    expect(dispatchMock).toHaveReturnedWith(undefined);
  });
});
