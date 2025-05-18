import React from "react";
import { render } from "@testing-library/react";
import useRouterStartPage from "@/hooks/router/useRouterStartPage.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";

jest.mock(
  "react-router-dom",
  (): {
    __esModule: boolean;
    useNavigate: jest.Mock;
    useLocation: jest.Mock;
  } => ({
    __esModule: true,
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  useRouterStartPage();

  return <div data-testid={testComponentDataTestId}></div>;
};

describe("useRouterStartPage Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const navigateMock: jest.Mock = jest.fn();
  const pathnameMock: string = "path";
  const locationMock = {
    pathname: pathnameMock,
  };

  beforeEach((): void => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useLocation as jest.Mock).mockReturnValue(locationMock);
  });

  it("calls navigate with STARTPAGE_PATH", (): void => {
    setup();

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(STARTPAGE_PATH, {
      replace: true,
    });
  });

  it("does not call navigate if pathname is already STARTPAGE_PATH", (): void => {
    (useLocation as jest.Mock).mockReturnValue({
      ...locationMock,
      pathname: STARTPAGE_PATH,
    });
    setup();

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("calls hook useNavigate", (): void => {
    setup();

    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledWith();
    expect(useNavigate).toHaveReturnedWith(navigateMock);
  });

  it("calls hook useLocation", (): void => {
    setup();

    expect(useLocation).toHaveBeenCalledTimes(1);
    expect(useLocation).toHaveBeenCalledWith();
    expect(useLocation).toHaveReturnedWith({ pathname: pathnameMock });
  });
});
