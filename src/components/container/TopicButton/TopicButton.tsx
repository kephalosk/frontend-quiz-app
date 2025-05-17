import "./TopicButton.scss";
import React, { ReactElement, useRef } from "react";
import { TOPIC_BUTTON_ARIA_LABEL_PREFIX } from "@/globals/constants/Constants.ts";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import useDarkMode from "@/hooks/redux/darkMode/useDarkMode.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { TopicButtonIconHook } from "@/globals/models/types/TopicButtonTypes.ts";
import useTopicButtonIcon from "@/hooks/topicButton/useTopicButtonIcon.ts";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import { KeyClickBypassHook } from "@/globals/models/types/KeyClickBypassTypes.ts";

export interface TopicButtonProps {
  text: string;
  type: TopicEnum;
  handleButtonClick: () => void;
}

const TopicButton: React.FC<TopicButtonProps> = React.memo(
  ({ text, type, handleButtonClick }: TopicButtonProps): ReactElement => {
    const buttonRef: React.RefObject<HTMLButtonElement | null> =
      useRef<HTMLButtonElement>(null);
    const { handleClick, handleKeyDown }: KeyClickBypassHook =
      useKeyClickBypass(handleButtonClick);
    const handlePointerUp = useBlurOnPointerUp(buttonRef);

    const { src, alt, color }: TopicButtonIconHook = useTopicButtonIcon(type);

    const isDarkModeOn: boolean = useDarkMode();

    return (
      <button
        ref={buttonRef}
        className={`topicButton ${isDarkModeOn ? "topicButton--darkMode" : "topicButton--lightMode"}`}
        type="button"
        onClick={handleClick}
        onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) =>
          handleKeyDown(event)
        }
        onMouseDown={handlePointerUp}
        aria-label={`${TOPIC_BUTTON_ARIA_LABEL_PREFIX}${text}`}
        tabIndex={0}
      >
        <img
          className={`topicButtonIcon topicButtonIcon--${color}`}
          src={src}
          alt={alt}
          aria-hidden={true}
        />
        <Label
          className="topicButtonText"
          type={LabelTypeEnum.QUIZ_BUTTON_LABEL}
          text={text}
        />
      </button>
    );
  },
);

export default TopicButton;
