import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { setIsQuizFinished } from "@/redux/slices/topicSlice.ts";
import useUpdateIsQuizFinished from "@/hooks/redux/topic/dispatch/useUpdateIsQuizFinished.ts";

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
    setIsQuizFinished: jest.Mock;
  } => ({
    setIsQuizFinished: jest.fn(),
  }),
);

const newValue: boolean = true;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useUpdateIsQuizFinished();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange(newValue)}
    ></div>
  );
};

describe("useUpdateIsQuizFinished hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("calls setIsQuizFinished with expected value", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(setIsQuizFinished(newValue));
    expect(dispatchMock).toHaveReturnedWith(undefined);
  });
});
