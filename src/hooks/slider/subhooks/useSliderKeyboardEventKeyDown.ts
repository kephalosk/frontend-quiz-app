import React, { useCallback } from "react";
import isCharacterLengthGoingOutOfBounce from "@/globals/helper/slider/isCharacterLengthGoingOutOfBounce.ts";
import setNewPosition from "@/globals/helper/slider/setNewPosition.ts";
import { SliderKeyboardKeyDownHook } from "@/globals/models/types/SliderKeyboardTypes.ts";
import { ERROR_MESSAGE_SLIDER_KEYBOARD_KEYDOWN_PREFIX } from "@/globals/constants/ErrorMessages.ts";

const useSliderKeyboardEventKeyDown = (
  currentValue: number,
  minValue: number,
  maxValue: number,
  propagateNewValue: (newValue: number) => void,
  onPositionChange: (newPositionPercent: number) => void,
  onFocusChange: (newFocus: boolean) => void,
): SliderKeyboardKeyDownHook => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      try {
        if (event.key != "ArrowLeft" && event.key != "ArrowRight") {
          return;
        }

        onFocusChange(true);

        if (
          isCharacterLengthGoingOutOfBounce(
            event,
            currentValue,
            minValue,
            maxValue,
          )
        ) {
          return;
        }

        if (event.key === "ArrowLeft") {
          const newPosition: number = currentValue - 1;
          setNewPosition(
            newPosition,
            maxValue,
            propagateNewValue,
            onPositionChange,
          );
        } else {
          const newPosition: number = currentValue + 1;
          setNewPosition(
            newPosition,
            maxValue,
            propagateNewValue,
            onPositionChange,
          );
        }
      } catch (error) {
        console.error(ERROR_MESSAGE_SLIDER_KEYBOARD_KEYDOWN_PREFIX, error);
      }
    },
    [
      currentValue,
      maxValue,
      minValue,
      onFocusChange,
      onPositionChange,
      propagateNewValue,
    ],
  );
  return { handleKeyDown };
};

export default useSliderKeyboardEventKeyDown;
