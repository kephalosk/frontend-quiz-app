import "./ErrorContainer.scss";
import React, { ReactElement } from "react";
import {
  ERROR_ICON_D,
  ERROR_ICON_SRC,
} from "@/globals/constants/Ressources.ts";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { MISSING_SELECTION_ERROR_MESSAGE } from "@/globals/constants/ErrorMessages.ts";

const ErrorContainer: React.FC = (): ReactElement => {
  return (
    <div className="errorContainer">
      <svg
        className="errorContainerIcon"
        xmlns={ERROR_ICON_SRC}
        viewBox="0 0 40 40"
      >
        <path className="errorContainerIconPath" d={ERROR_ICON_D} />
      </svg>
      <Label
        type={LabelTypeEnum.ERROR_LABEL}
        text={MISSING_SELECTION_ERROR_MESSAGE}
      />
    </div>
  );
};

export default ErrorContainer;
