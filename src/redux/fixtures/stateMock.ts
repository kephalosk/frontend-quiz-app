import { RootState } from "@/redux/store.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import { CHARACTER_LENGTH_MIN_VALUE } from "@/globals/config.ts";

export const stateMock: RootState = {
  characterLength: { value: CHARACTER_LENGTH_MIN_VALUE },
  securityLevel: { value: SecurityLevelEnum.NONE },
  options: {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  },
};
