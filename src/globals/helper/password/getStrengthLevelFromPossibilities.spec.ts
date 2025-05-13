import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import getStrengthLevelFromPoints from "@/globals/helper/password/getStrengthLevelFromPossibilities.ts";
import {
  POSSIBILITIES_LOW_STRENGTH_BORDER,
  POSSIBILITIES_MEDIUM_STRENGTH_BORDER,
  POSSIBILITIES_NONE_STRENGTH_BORDER,
  POSSIBILITIES_WEAK_STRENGTH_BORDER,
} from "@/globals/config.ts";

describe("getStrengthLevelFromPossibilities function", (): void => {
  it.each([
    [SecurityLevelEnum.NONE, POSSIBILITIES_NONE_STRENGTH_BORDER],
    [SecurityLevelEnum.WEAK, POSSIBILITIES_WEAK_STRENGTH_BORDER],
    [SecurityLevelEnum.LOW, POSSIBILITIES_LOW_STRENGTH_BORDER],
    [SecurityLevelEnum.MEDIUM, POSSIBILITIES_MEDIUM_STRENGTH_BORDER],
    [SecurityLevelEnum.STRONG, POSSIBILITIES_MEDIUM_STRENGTH_BORDER + 1n],
  ])(
    "returns Securitylevel %s for %s possibilities",
    (level: SecurityLevelEnum, possibilities: bigint): void => {
      const result: SecurityLevelEnum =
        getStrengthLevelFromPoints(possibilities);

      expect(result).toEqual(level);
    },
  );
});
