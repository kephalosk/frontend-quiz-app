import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import usePasswordStrength from "@/hooks/password/usePasswordStrength.ts";
import { PasswordStrengthHook } from "@/globals/models/types/PasswordStrengthTypes.ts";
import getPossibilitiesFromOptions from "@/globals/helper/password/getPossibilitiesFromOptions.ts";
import getStrengthLevelFromPossibilities from "@/globals/helper/password/getStrengthLevelFromPossibilities.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";

jest.mock(
  "@/globals/helper/password/getPossibilitiesFromOptions.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/password/getStrengthLevelFromPossibilities.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const password: string = "password";
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { getPasswordStrength }: PasswordStrengthHook = usePasswordStrength();

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => getPasswordStrength(password)}
    ></div>
  );
};

describe("usePasswordStrength Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const possibilities: bigint = 1000n;
  const securityLevel: SecurityLevelEnum = SecurityLevelEnum.WEAK;

  beforeEach((): void => {
    (getPossibilitiesFromOptions as jest.Mock).mockReturnValue(possibilities);
    (getStrengthLevelFromPossibilities as jest.Mock).mockReturnValue(
      securityLevel,
    );
  });

  it("does not call for possibilities and strength by default", (): void => {
    setup();

    expect(getPossibilitiesFromOptions).not.toHaveBeenCalled();
    expect(getStrengthLevelFromPossibilities).not.toHaveBeenCalled();
  });

  it("returns strength for password if getPasswordStrength is called", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(getPossibilitiesFromOptions).toHaveBeenCalledTimes(1);
    expect(getPossibilitiesFromOptions).toHaveBeenCalledWith(password);
    expect(getStrengthLevelFromPossibilities).toHaveBeenCalledTimes(1);
    expect(getStrengthLevelFromPossibilities).toHaveBeenCalledWith(
      possibilities,
    );
    expect(getStrengthLevelFromPossibilities).toHaveReturnedWith(securityLevel);
  });
});
