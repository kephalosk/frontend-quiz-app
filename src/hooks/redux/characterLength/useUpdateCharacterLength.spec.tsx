import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { setCharacterLengthValue } from "@/redux/slices/characterLengthSlice.ts";
import useUpdateCharacterLength from "@/hooks/redux/characterLength/useUpdateCharacterLength.ts";
import { useDispatch } from "react-redux";

jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock;
  } => ({
    useDispatch: jest.fn(),
  }),
);

jest.mock(
  "@/redux/slices/characterLengthSlice.ts",
  (): {
    setCharacterLengthValue: jest.Mock;
  } => ({
    setCharacterLengthValue: jest.fn(),
  }),
);

const newValue: number = 21;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useUpdateCharacterLength();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange(newValue)}
    ></div>
  );
};

describe("useCharacterLength hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("calls setCharacterLengthValue with expected value", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      setCharacterLengthValue(newValue),
    );
  });
});
