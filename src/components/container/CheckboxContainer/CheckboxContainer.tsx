import "./CheckboxContainer.scss";
import { OptionEnum } from "@/globals/models/enums/OptionEnum.ts";
import Checkbox from "@/components/atoms/Checkbox/Checkbox.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import React, { useRef } from "react";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";

export interface CheckboxContainerProps {
  option: OptionEnum;
  isChecked: boolean;
  handleOptionClick: () => void;
}

const CheckboxContainer: React.FC<CheckboxContainerProps> = ({
  option,
  isChecked,
  handleOptionClick,
}: CheckboxContainerProps) => {
  const divRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const { handleClick, handleKeyDown } = useKeyClickBypass(handleOptionClick);
  const handlePointerUp = useBlurOnPointerUp(divRef);

  return (
    <div
      ref={divRef}
      className="checkboxContainer"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
        handleKeyDown(event)
      }
      onMouseDown={handlePointerUp}
    >
      <Checkbox isChecked={isChecked} />
      <Label type={LabelTypeEnum.CHECKBOX_LABEL} text={option} />
    </div>
  );
};

export default CheckboxContainer;
