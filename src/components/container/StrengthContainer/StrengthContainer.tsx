import "./StrengthContainer.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import BeamContainer from "@/components/container/BeamContainer/BeamContainer.tsx";
import { STRENGTH_LABEL } from "@/globals/constants/Constants.ts";
import useSecurityLevel from "@/hooks/redux/securityLevel/useSecurityLevel.ts";
import useSecurityLabel from "@/hooks/password/useSecurityLabel.ts";

const StrengthContainer: React.FC = (): ReactElement => {
  const { securityLevel } = useSecurityLevel();
  const { securityLabel } = useSecurityLabel(securityLevel);

  return (
    <div className="strengthContainer">
      <span className="strengthContainerSpace">
        <Label type={LabelTypeEnum.UPPERCASE_LABEL} text={STRENGTH_LABEL} />
      </span>
      <Label type={LabelTypeEnum.BEAM_LABEL} text={securityLabel} />
      <BeamContainer securityLevel={securityLevel} />
    </div>
  );
};

export default StrengthContainer;
