import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import getPossibilitiesFromOptions from "@/globals/helper/password/getPossibilitiesFromOptions.ts";
import getStrengthLevelFromPossibilities from "@/globals/helper/password/getStrengthLevelFromPossibilities.ts";
import { PasswordStrengthHook } from "@/globals/models/types/PasswordStrengthTypes.ts";

const usePasswordStrength = (): PasswordStrengthHook => {
  const getPasswordStrength = (password: string): SecurityLevelEnum => {
    const possibilities: bigint = getPossibilitiesFromOptions(password);

    return getStrengthLevelFromPossibilities(possibilities);
  };

  return { getPasswordStrength };
};

export default usePasswordStrength;
