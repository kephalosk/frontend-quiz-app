import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import usePasswordChange from "@/hooks/password/usePasswordChange.ts";
import { PasswordChangeHook } from "@/globals/models/types/PasswordChangeTypes.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{ newPassword: string }> = ({ newPassword }) => {
  const { password, handlePasswordChange }: PasswordChangeHook =
    usePasswordChange();

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handlePasswordChange(newPassword)}
    >
      {password}
    </div>
  );
};

describe("usePasswordChange Hook", (): void => {
  const defaultPassword: string = "password";

  const setup = (passwordOverride?: string): void => {
    render(<TestComponent newPassword={passwordOverride ?? defaultPassword} />);
  };

  it("sets the password when handlePasswordChange is triggered", (): void => {
    const expectedValue: string = "changedPassword";
    setup(expectedValue);

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toHaveTextContent(expectedValue);
  });

  it("does not set a password by default", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toHaveTextContent(EMPTY_STRING);
  });
});
