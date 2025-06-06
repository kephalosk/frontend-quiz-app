import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { stateMock } from "@/redux/fixtures/stateMock.ts";
import useCurrentScore from "@/hooks/redux/topic/selector/useCurrentScore.ts";

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
  const currentScore: number = useCurrentScore();
  return <div data-testid={testComponentDataTestId}>{currentScore}</div>;
};

describe("useCurrentScore hook", (): void => {
  const expectedState: number = 10;

  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const state: RootState = {
    ...stateMock,
    topic: { ...stateMock.topic, currentScore: expectedState },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(state),
    );
  });

  it("returns currentScore", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toBeInTheDocument();
    expect(element.innerHTML).toEqual(`${expectedState}`);
    expect(useSelector).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
    expect(useSelector).toHaveReturnedWith(expectedState);
  });
});
