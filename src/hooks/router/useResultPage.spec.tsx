import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import {
  RESULT_SUB_PATH,
  STARTPAGE_PATH,
} from "@/globals/constants/Ressources.ts";
import useResultPage from "@/hooks/router/useResultPage.ts";

jest.mock(
  "react-router-dom",
  (): {
    __esModule: boolean;
    useNavigate: jest.Mock;
  } => ({
    __esModule: true,
    useNavigate: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { loadResultPage } = useResultPage();

  return (
    <div data-testid={testComponentDataTestId} onClick={loadResultPage}></div>
  );
};

describe("useResultPage Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const navigateMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it("calls navigate with ${STARTPAGE_PATH}${RESULT_SUB_PATH}", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(
      `${STARTPAGE_PATH}${RESULT_SUB_PATH}`,
    );
  });

  it("does not call navigate if loadResultPage is not triggered", (): void => {
    setup();

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("calls hook useNavigate", (): void => {
    setup();

    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledWith();
    expect(useNavigate).toHaveReturnedWith(navigateMock);
  });
});
