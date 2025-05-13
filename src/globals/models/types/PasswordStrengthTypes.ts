import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";

export type PasswordStrengthHook = {
  getPasswordStrength: (password: string) => SecurityLevelEnum;
};
