import "./SwitchButton.scss";
import React, { ReactElement, useRef } from "react";
import { SWITCH_BUTTON_ARIA_LABEL_PREFIX } from "@/globals/constants/Constants.ts";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import { KeyClickBypassHook } from "@/globals/models/types/KeyClickBypassTypes.ts";

export interface SwitchButtonProps {
  isActive: boolean;
  handleButtonClick: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  isActive,
  handleButtonClick,
}: SwitchButtonProps): ReactElement => {
  const buttonRef: React.RefObject<HTMLButtonElement | null> =
    useRef<HTMLButtonElement>(null);
  const { handleClick, handleKeyDown }: KeyClickBypassHook =
    useKeyClickBypass(handleButtonClick);
  const handlePointerUp = useBlurOnPointerUp(buttonRef);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`switchButton ${isActive ? "switchButton--active" : "switchButton--inActive"}`}
      aria-label={`${SWITCH_BUTTON_ARIA_LABEL_PREFIX}${isActive}`}
      onClick={handleClick}
      onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) =>
        handleKeyDown(event)
      }
      onMouseDown={handlePointerUp}
    >
      <div
        className={`switchButtonAdjuster ${isActive && "switchButtonAdjuster--active"}`}
      ></div>
    </button>
  );
};

export default SwitchButton;
