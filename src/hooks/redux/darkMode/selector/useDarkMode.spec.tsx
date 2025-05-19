import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { stateMock } from "@/redux/fixtures/stateMock.ts";

jest.mock(
  "react-redux",
  (): {
    useSelector: jest.Mock;
  } => ({
    useSelector: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const darkMode: boolean = useDarkMode();
  return <div data-testid={testComponentDataTestId}>{`${darkMode}`}</div>;
};

describe("useDarkMode hook", (): void => {
  const expectedDarkModeState: boolean = true;

  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const state: RootState = {
    ...stateMock,
    darkMode: { value: expectedDarkModeState },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(state),
    );
  });

  it("returns darkMode", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toBeInTheDocument();
    expect(element.innerHTML).toEqual(`${expectedDarkModeState}`);
    expect(useSelector).toHaveBeenCalledTimes(1);
  });
});
