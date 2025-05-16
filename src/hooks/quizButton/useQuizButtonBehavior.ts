import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import React, { useRef } from "react";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import { KeyClickBypassHook } from "@/globals/models/types/KeyClickBypassTypes.ts";
import { QuizButtonBehaviorHook } from "@/globals/models/types/QuizButtonTypes.ts";

export default function useQuizButtonBehavior(
  handleButtonClick: () => void,
  status: QuestionStatusEnum,
  isDisabled: boolean,
): QuizButtonBehaviorHook {
  const ref: React.RefObject<HTMLButtonElement | null> =
    useRef<HTMLButtonElement>(null);
  const { handleClick, handleKeyDown }: KeyClickBypassHook =
    useKeyClickBypass(handleButtonClick);
  const handlePointerUp: () => void = useBlurOnPointerUp(ref);
  const isClickable: boolean =
    status === QuestionStatusEnum.DEFAULT && !isDisabled;

  return {
    ref,
    isClickable,
    buttonEventProps: {
      onClick: isClickable ? handleClick : undefined,
      onKeyDown: isClickable ? handleKeyDown : undefined,
      onMouseDown: isClickable ? handlePointerUp : undefined,
    },
  };
}
