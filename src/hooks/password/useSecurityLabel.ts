import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import { SecurityLabelEnum } from "@/globals/models/enums/SecurityLabelEnum.ts";
import { useMemo } from "react";

const useSecurityLabel = (
  securityLevel: SecurityLevelEnum,
): {
  securityLabel: SecurityLabelEnum;
} => {
  const securityLabel: SecurityLabelEnum = useMemo(() => {
    const labelMapping: Record<SecurityLevelEnum, SecurityLabelEnum> = {
      [SecurityLevelEnum.NONE]: SecurityLabelEnum.NONE,
      [SecurityLevelEnum.WEAK]: SecurityLabelEnum.WEAK,
      [SecurityLevelEnum.LOW]: SecurityLabelEnum.LOW,
      [SecurityLevelEnum.MEDIUM]: SecurityLabelEnum.MEDIUM,
      [SecurityLevelEnum.STRONG]: SecurityLabelEnum.STRONG,
    };

    return labelMapping[securityLevel] || SecurityLabelEnum.NONE;
  }, [securityLevel]);

  return { securityLabel };
};

export default useSecurityLabel;
