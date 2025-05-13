import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import { useMemo } from "react";
import { BeamItem, BeamItems } from "@/globals/constants/BeamItems.ts";
import { BeamColorEnum } from "@/globals/models/enums/BeamColorEnum.ts";
import getBeamColorFromSecurityLevel from "@/globals/helper/getBeamColorFromSecurityLevel.ts";

const useMarkedBeams = (
  securityLevel: SecurityLevelEnum,
): { beams: BeamItem[] } => {
  const beams: BeamItem[] = useMemo((): BeamItem[] => {
    const color: BeamColorEnum = getBeamColorFromSecurityLevel(securityLevel);

    return BeamItems.map((beam: BeamItem): BeamItem => {
      if (beam.index <= securityLevel) {
        return { ...beam, color };
      }
      return beam;
    });
  }, [securityLevel]);

  return { beams };
};

export default useMarkedBeams;
