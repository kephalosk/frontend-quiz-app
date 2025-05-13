import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import { BeamColorEnum } from "@/globals/models/enums/BeamColorEnum.ts";

const getBeamColorFromSecurityLevel = (
  securityLevel: SecurityLevelEnum,
): BeamColorEnum => {
  switch (securityLevel) {
    case SecurityLevelEnum.NONE:
      return BeamColorEnum.TRANSPARENT;
    case SecurityLevelEnum.WEAK:
      return BeamColorEnum.RED;
    case SecurityLevelEnum.LOW:
      return BeamColorEnum.ORANGE;
    case SecurityLevelEnum.MEDIUM:
      return BeamColorEnum.YELLOW;
    case SecurityLevelEnum.STRONG:
      return BeamColorEnum.GREEN;
  }
};

export default getBeamColorFromSecurityLevel;
