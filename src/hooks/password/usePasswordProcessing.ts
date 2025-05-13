import useCurrentOptions from "@/hooks/redux/options/useCurrentOptions.ts";
import useCharacterLength from "@/hooks/redux/characterLength/useCharacterLength.ts";
import { PasswordGenerationHook } from "@/globals/models/types/PasswordGenerationTypes.ts";
import usePasswordGeneration from "@/hooks/password/usePasswordGeneration.ts";
import { PasswordStrengthHook } from "@/globals/models/types/PasswordStrengthTypes.ts";
import usePasswordStrength from "@/hooks/password/usePasswordStrength.ts";
import useUpdateSecurityLevel from "@/hooks/redux/securityLevel/useUpdateSecurityLevel.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import { PasswordProcessingHook } from "@/globals/models/types/PasswordProcessingTypes.ts";
import { CurentOptionsHook } from "@/globals/models/types/CurrentOptionsTypes.ts";

const usePasswordProcessing = (
  propagateValue: (value: string) => void,
): PasswordProcessingHook => {
  const { currentOptions }: CurentOptionsHook = useCurrentOptions();
  const characterLength: number = useCharacterLength();
  const { generatePassword }: PasswordGenerationHook = usePasswordGeneration(
    currentOptions,
    characterLength,
  );
  const { getPasswordStrength }: PasswordStrengthHook = usePasswordStrength();
  const setSecurityLevel: (newValue: number) => void = useUpdateSecurityLevel();

  const handlePasswordGeneration = (): void => {
    const password: string = generatePassword();
    const strength: SecurityLevelEnum = getPasswordStrength(password);
    setSecurityLevel(strength);
    propagateValue(password);
  };

  return { handlePasswordGeneration };
};

export default usePasswordProcessing;
