import "./PasswordContainer.scss";
import Label from "../../atoms/Label/Label";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import {
  COPY_ICON_ALT_TEXT,
  COPY_TEXT,
} from "@/globals/constants/Constants.ts";
import { COPY_ICON_D, COPY_ICON_SRC } from "@/globals/constants/Ressources.ts";
import React, { useRef } from "react";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import usePasswordCopy from "@/hooks/password/usePasswordCopy.ts";
import useCopyStatus from "@/hooks/password/useCopyStatus.ts";
import { PasswordCopyHook } from "@/globals/models/types/PasswordCopyTypes.ts";

export interface PasswordContainerProps {
  password: string;
}

const PasswordContainer = ({ password }: PasswordContainerProps) => {
  const { isCopied, setIsCopied, handleButtonClick }: PasswordCopyHook =
    usePasswordCopy(password);
  useCopyStatus(password, setIsCopied);

  const divRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const handlePointerUp = useBlurOnPointerUp(divRef);
  const { handleClick, handleKeyDown } = useKeyClickBypass(handleButtonClick);

  return (
    <div className="passwordContainer">
      <div className="passwordContainerSpaceWrapper">
        <span className="passwordContainerSpace">
          <Label type={LabelTypeEnum.PASSWORD_LABEL} text={password} />
        </span>
        <div className="passwordContainerSpaceCopy">
          {isCopied && (
            <Label type={LabelTypeEnum.COPY_LABEL} text={COPY_TEXT} />
          )}
        </div>
      </div>
      <div
        ref={divRef}
        role="button"
        className="passwordContainerIconWrapper"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
          handleKeyDown(event)
        }
        onMouseDown={handlePointerUp}
        aria-label={COPY_ICON_ALT_TEXT}
        aria-hidden={false}
      >
        <svg className="passwordContainerIcon" xmlns={COPY_ICON_SRC}>
          <path className="passwordContainerIconPath" d={COPY_ICON_D} />
        </svg>
      </div>
    </div>
  );
};

export default PasswordContainer;
