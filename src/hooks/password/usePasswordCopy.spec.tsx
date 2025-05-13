import React, { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import usePasswordCopy from "@/hooks/password/usePasswordCopy.ts";
import { PasswordCopyHook } from "@/globals/models/types/PasswordCopyTypes.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";
import { ERROR_MESSAGE_PASSWORD_COPY_PREFIX } from "@/globals/constants/ErrorMessages.ts";

jest.spyOn(console, "error").mockImplementation((): null => null);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{ password: string }> = ({ password }) => {
  const { isCopied, setIsCopied, handleButtonClick }: PasswordCopyHook =
    usePasswordCopy(password);

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={handleButtonClick}
      onKeyDown={() => setIsCopied(false)}
      className={`${isCopied ? "isCopied" : ""}`}
    ></div>
  );
};

describe("usePasswordCopy Hook", (): void => {
  const setup = ({ password }: { password: string }): void => {
    render(<TestComponent password={password} />);
  };

  const clipboardMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    Object.defineProperty(global.navigator, "clipboard", {
      value: { writeText: clipboardMock },
      writable: true,
    });
  });

  it("sets 'isCopied' when handleButtonClick is triggered", async (): Promise<void> => {
    setup({ password: "testPassword" });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    await act(async () => {
      fireEvent.click(element);
    });

    expect(element).toHaveClass("isCopied");
  });

  it("does not set 'isCopied' when password is empty", async (): Promise<void> => {
    setup({ password: EMPTY_STRING });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    await act(async () => {
      fireEvent.click(element);
    });

    expect(element).not.toHaveClass("isCopied");
  });

  it("throws an error if copy to clipboard fails", async (): Promise<void> => {
    const errorMessage: string = "Error";
    Object.defineProperty(global.navigator, "clipboard", {
      value: {
        writeText: (): void => {
          throw new Error();
        },
      },
      writable: true,
    });
    setup({ password: "testPassword" });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    await act(async (): Promise<void> => {
      fireEvent.click(element);
    });

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      ERROR_MESSAGE_PASSWORD_COPY_PREFIX + errorMessage,
    );
  });
});
