import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import usePasswordProcessing from "@/hooks/password/usePasswordProcessing.ts";
import { PasswordProcessingHook } from "@/globals/models/types/PasswordProcessingTypes.ts";
import useCurrentOptions from "@/hooks/redux/options/useCurrentOptions.ts";
import useCharacterLength from "@/hooks/redux/characterLength/useCharacterLength.ts";
import usePasswordGeneration from "@/hooks/password/usePasswordGeneration.ts";
import usePasswordStrength from "@/hooks/password/usePasswordStrength.ts";
import useUpdateSecurityLevel from "@/hooks/redux/securityLevel/useUpdateSecurityLevel.ts";
import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import { CurentOptionsHook } from "@/globals/models/types/CurrentOptionsTypes.ts";
import { CHARACTER_LENGTH_MIN_VALUE } from "@/globals/config.ts";
import { PasswordGenerationHook } from "@/globals/models/types/PasswordGenerationTypes.ts";
import { PasswordStrengthHook } from "@/globals/models/types/PasswordStrengthTypes.ts";

const propagateValueMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { handlePasswordGeneration }: PasswordProcessingHook =
    usePasswordProcessing(propagateValueMock);

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={handlePasswordGeneration}
    ></div>
  );
};

jest.mock(
  "@/hooks/redux/options/useCurrentOptions.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/characterLength/useCharacterLength.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/password/usePasswordGeneration.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/password/usePasswordStrength.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/securityLevel/useUpdateSecurityLevel.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("usePasswordProcessing Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const currentOptions: OptionItem[] = OptionItems;
  const useCurrentOptionsMock: CurentOptionsHook = {
    currentOptions,
  };

  const characterLength: number = CHARACTER_LENGTH_MIN_VALUE;

  const generatePasswordMock: jest.Mock = jest.fn();
  const usePasswordGenerationMock: PasswordGenerationHook = {
    generatePassword: generatePasswordMock,
  };

  const getPasswordStrengthMock: jest.Mock = jest.fn();
  const usePasswordStrengthMock: PasswordStrengthHook = {
    getPasswordStrength: getPasswordStrengthMock,
  };

  const setSecurityLevelMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useCurrentOptions as jest.Mock).mockReturnValue(useCurrentOptionsMock);
    (useCharacterLength as jest.Mock).mockReturnValue(characterLength);
    (usePasswordGeneration as jest.Mock).mockReturnValue(
      usePasswordGenerationMock,
    );
    (usePasswordStrength as jest.Mock).mockReturnValue(usePasswordStrengthMock);
    (useUpdateSecurityLevel as jest.Mock).mockReturnValue(setSecurityLevelMock);
  });

  it("handles password generation", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(propagateValueMock).toHaveBeenCalledTimes(1);
    expect(propagateValueMock).toHaveBeenCalledWith(undefined);
  });

  it("calls hook useCurrentOptions", (): void => {
    setup();

    expect(useCurrentOptions).toHaveBeenCalledTimes(1);
    expect(useCurrentOptions).toHaveBeenCalledWith();
    expect(useCurrentOptions).toHaveReturnedWith({ currentOptions });
  });

  it("calls hook useCharacterLength", (): void => {
    setup();

    expect(useCharacterLength).toHaveBeenCalledTimes(1);
    expect(useCharacterLength).toHaveBeenCalledWith();
    expect(useCharacterLength).toHaveReturnedWith(characterLength);
  });

  it("calls hook usePasswordGeneration", (): void => {
    setup();

    expect(usePasswordGeneration).toHaveBeenCalledTimes(1);
    expect(usePasswordGeneration).toHaveBeenCalledWith(
      OptionItems,
      characterLength,
    );
    expect(usePasswordGeneration).toHaveReturnedWith({
      generatePassword: generatePasswordMock,
    });
  });

  it("calls hook usePasswordStrength", (): void => {
    setup();

    expect(usePasswordStrength).toHaveBeenCalledTimes(1);
    expect(usePasswordStrength).toHaveBeenCalledWith();
    expect(usePasswordStrength).toHaveReturnedWith({
      getPasswordStrength: getPasswordStrengthMock,
    });
  });

  it("calls hook useUpdateSecurityLevel", (): void => {
    setup();

    expect(useUpdateSecurityLevel).toHaveBeenCalledTimes(1);
    expect(useUpdateSecurityLevel).toHaveBeenCalledWith();
    expect(useUpdateSecurityLevel).toHaveReturnedWith(setSecurityLevelMock);
  });
});
