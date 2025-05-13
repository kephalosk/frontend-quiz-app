import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import { BeamColorEnum } from "@/globals/models/enums/BeamColorEnum.ts";
import getBeamColorFromSecurityLevel from "@/globals/helper/getBeamColorFromSecurityLevel.ts";

describe("getBeamColorFromSecurityLevel", (): void => {
  it.each([
    [BeamColorEnum.TRANSPARENT, SecurityLevelEnum.NONE],
    [BeamColorEnum.RED, SecurityLevelEnum.WEAK],
    [BeamColorEnum.ORANGE, SecurityLevelEnum.LOW],
    [BeamColorEnum.YELLOW, SecurityLevelEnum.MEDIUM],
    [BeamColorEnum.GREEN, SecurityLevelEnum.STRONG],
  ])(
    "returns color %s for security Level %s",
    (expectedColor: BeamColorEnum, securityLevel: SecurityLevelEnum): void => {
      const receivedColor: BeamColorEnum =
        getBeamColorFromSecurityLevel(securityLevel);

      expect(receivedColor).toEqual(expectedColor);
    },
  );
});
