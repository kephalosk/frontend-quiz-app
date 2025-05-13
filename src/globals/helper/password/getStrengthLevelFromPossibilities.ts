import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import {
  POSSIBILITIES_LOW_STRENGTH_BORDER,
  POSSIBILITIES_MEDIUM_STRENGTH_BORDER,
  POSSIBILITIES_NONE_STRENGTH_BORDER,
  POSSIBILITIES_WEAK_STRENGTH_BORDER,
} from "@/globals/config.ts";

const getStrengthLevelFromPossibilities = (
  possibilities: bigint,
): SecurityLevelEnum => {
  if (possibilities <= POSSIBILITIES_NONE_STRENGTH_BORDER) {
    return SecurityLevelEnum.NONE;
  }
  if (possibilities <= POSSIBILITIES_WEAK_STRENGTH_BORDER) {
    return SecurityLevelEnum.WEAK;
  }
  if (possibilities <= POSSIBILITIES_LOW_STRENGTH_BORDER) {
    return SecurityLevelEnum.LOW;
  }
  if (possibilities <= POSSIBILITIES_MEDIUM_STRENGTH_BORDER) {
    return SecurityLevelEnum.MEDIUM;
  }
  return SecurityLevelEnum.STRONG;
};

export default getStrengthLevelFromPossibilities;
