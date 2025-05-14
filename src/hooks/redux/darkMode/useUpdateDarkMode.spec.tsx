import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useUpdateDarkMode from "@/hooks/redux/darkMode/useUpdateDarkMode.ts";
import { useDispatch } from "react-redux";
import { setDarkModeValue } from "@/redux/slices/darkModeSlice.ts";

jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock;
  } => ({
    useDispatch: jest.fn(),
  }),
);

jest.mock(
  "@/redux/slices/darkModeSlice.ts",
  (): {
    setDarkModeValue: jest.Mock;
  } => ({
    setDarkModeValue: jest.fn(),
  }),
);

const newValue: boolean = true;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const handleValueChange = useUpdateDarkMode();
  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleValueChange(newValue)}
    ></div>
  );
};

describe("useDarkMode hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("calls setDarkModeValue with expected value", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(setDarkModeValue(newValue));
  });
});
