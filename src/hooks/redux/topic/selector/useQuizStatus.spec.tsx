import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { stateMock } from "@/redux/fixtures/stateMock.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";
import useQuizStatus from "@/hooks/redux/topic/selector/useQuizStatus.ts";

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
  const quizStatus: LoadingStateEnum = useQuizStatus();
  return <div data-testid={testComponentDataTestId}>{quizStatus}</div>;
};

describe("useQuizStatus hook", (): void => {
  const expectedState: LoadingStateEnum = LoadingStateEnum.IDLE;

  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const state: RootState = {
    ...stateMock,
    topic: { ...stateMock.topic, quizStatus: expectedState },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(state),
    );
  });

  it("returns quizStatus", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toBeInTheDocument();
    expect(element.innerHTML).toEqual(`${expectedState}`);
    expect(useSelector).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
    expect(useSelector).toHaveReturnedWith(expectedState);
  });
});
