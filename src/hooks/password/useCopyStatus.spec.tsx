import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useCopyStatus from "@/hooks/password/useCopyStatus.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";

const newPassword: string = "newPassword";
const setIsCopiedMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  useCopyStatus(password, setIsCopiedMock);

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => setPassword(newPassword)}
    ></div>
  );
};

describe("useCopyStatus Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("does not call setIsCopied by default", (): void => {
    setup();

    expect(setIsCopiedMock).not.toHaveBeenCalled();
  });

  it("calls setIsCopied with false when password changes", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(setIsCopiedMock).toHaveBeenCalledTimes(1);
    expect(setIsCopiedMock).toHaveBeenCalledWith(false);
  });

  it("does not call setIsCopied again when password stays the same", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(setIsCopiedMock).toHaveBeenCalledTimes(1);
    expect(setIsCopiedMock).toHaveBeenCalledWith(false);

    fireEvent.click(element);

    expect(setIsCopiedMock).toHaveBeenCalledTimes(1);
  });
});
