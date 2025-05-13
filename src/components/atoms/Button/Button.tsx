import "./Button.scss";
import React, { ReactElement, useRef } from "react";
import clsx from "clsx";
import {
  ARROW_RIGHT_ICON_ALT_TEXT,
  BUTTON_ARIA_LABEL_PREFIX,
} from "@/globals/constants/Constants.ts";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";

export interface ButtonProps {
  text: string;
  handleButtonClick: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    text,
    handleButtonClick,
    isDisabled = false,
  }: ButtonProps): ReactElement => {
    const buttonRef: React.RefObject<HTMLButtonElement | null> =
      useRef<HTMLButtonElement>(null);
    const { handleClick, handleKeyDown } = useKeyClickBypass(handleButtonClick);
    const handlePointerUp = useBlurOnPointerUp(buttonRef);

    return (
      <button
        ref={buttonRef}
        className={clsx("button", { disabled: isDisabled })}
        type="button"
        onClick={isDisabled ? undefined : handleClick}
        onKeyDown={
          isDisabled
            ? undefined
            : (event: React.KeyboardEvent<HTMLButtonElement>) =>
                handleKeyDown(event)
        }
        onMouseDown={isDisabled ? undefined : handlePointerUp}
        aria-label={`${BUTTON_ARIA_LABEL_PREFIX}${text}`}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        disabled={isDisabled}
      >
        <span className="buttonText">{text}</span>
        <svg
          className="buttonIcon"
          aria-label={ARROW_RIGHT_ICON_ALT_TEXT}
          aria-hidden={true}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="buttonIconPath"
            d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
          />
        </svg>
      </button>
    );
  },
);

export default Button;
