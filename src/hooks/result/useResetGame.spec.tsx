import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useResetGame from "@/hooks/result/useResetGame.ts";
import { ResetGameHook } from "@/globals/models/types/ResultTypes.ts";
import { useNavigate } from "react-router-dom";
import useResetTopic from "@/hooks/redux/topic/dispatch/useResetTopic.ts";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";

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

jest.mock(
  "@/hooks/redux/topic/dispatch/useResetTopic.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { handleReset }: ResetGameHook = useResetGame();

  return (
    <div data-testid={testComponentDataTestId} onClick={handleReset}></div>
  );
};

describe("useResetGame Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const navigateMock: jest.Mock = jest.fn();

  const resetGameMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useResetTopic as jest.Mock).mockReturnValue(resetGameMock);
  });

  it("calls resetGame and navigate when handleReset is called", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(resetGameMock).toHaveBeenCalledTimes(1);
    expect(resetGameMock).toHaveBeenCalledWith();
    expect(resetGameMock).toHaveReturnedWith(undefined);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(STARTPAGE_PATH, {
      replace: true,
    });
    expect(navigateMock).toHaveReturnedWith(undefined);
  });

  it("calls hook useNavigate", (): void => {
    setup();

    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledWith();
    expect(useNavigate).toHaveReturnedWith(navigateMock);
  });

  it("calls hook useResetTopic", (): void => {
    setup();

    expect(useResetTopic).toHaveBeenCalledTimes(1);
    expect(useResetTopic).toHaveBeenCalledWith();
    expect(useResetTopic).toHaveReturnedWith(resetGameMock);
  });
});
