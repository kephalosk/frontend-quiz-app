import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import useShowTopic from "@/hooks/topic/useShowTopic.ts";
import { useLocation } from "react-router-dom";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";

jest.mock(
  "react-router-dom",
  (): {
    __esModule: boolean;
    useLocation: jest.Mock;
  } => ({
    __esModule: true,
    useLocation: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const showTopic: boolean = useShowTopic();

  return <div data-testid={testComponentDataTestId}>{`${showTopic}`}</div>;
};

describe("useShowTopic hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const pathnameMock: string = "page";
  const useLocationMock: {
    pathname: string;
  } = {
    pathname: pathnameMock,
  };

  beforeEach((): void => {
    (useLocation as jest.Mock).mockReturnValue(useLocationMock);
  });

  it.each([
    [true, "randomPage"],
    [false, STARTPAGE_PATH],
  ])(
    "returns %s and type for topic %s",
    (expected: boolean, pathname: string): void => {
      (useLocation as jest.Mock).mockReturnValue({ pathname });
      setup();

      const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

      expect(element).toHaveTextContent(`${expected}`);
    },
  );

  it("calls hook useLocation", (): void => {
    setup();

    expect(useLocation).toHaveBeenCalledTimes(1);
    expect(useLocation).toHaveBeenCalledWith();
    expect(useLocation).toHaveReturnedWith(useLocationMock);
  });
});
