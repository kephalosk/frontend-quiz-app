import React, { ReactElement } from "react";
import useCharacterLength from "@/hooks/redux/characterLength/useCharacterLength.ts";
import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";
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
  const characterLength: number = useCharacterLength();
  return <div data-testid={testComponentDataTestId}>{characterLength}</div>;
};

describe("useCharacterLength hook", (): void => {
  const expectedCharacterLength: number = 21;

  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const state: RootState = {
    ...stateMock,
    characterLength: { value: expectedCharacterLength },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(state),
    );
  });

  it("returns characterLength", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toBeInTheDocument();
    expect(element.innerHTML).toEqual(`${expectedCharacterLength}`);
    expect(useSelector).toHaveBeenCalledTimes(1);
  });
});
