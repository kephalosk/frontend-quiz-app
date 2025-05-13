import {
  SliderKeyboardFocusHook,
  SliderKeyboardHook,
  SliderKeyboardKeyDownHook,
  SliderKeyboardKeyUpHook,
} from "@/globals/models/types/SliderKeyboardTypes.ts";
import useSliderKeyboardEventOnFocusChange from "@/hooks/slider/subhooks/useSliderKeyboardEventOnFocusChange.ts";
import useSliderKeyboardEventKeyDown from "@/hooks/slider/subhooks/useSliderKeyboardEventKeyDown.ts";
import useSliderKeyboardEventKeyUp from "@/hooks/slider/subhooks/useSliderKeyboardEventKeyUp.ts";

const useSliderKeyboardEvents = (
  currentValue: number,
  minValue: number,
  maxValue: number,
  propagateNewValue: (newValue: number) => void,
  onPositionChange: (newPositionPercent: number) => void,
): SliderKeyboardHook => {
  const { isFocused, onFocusChange }: SliderKeyboardFocusHook =
    useSliderKeyboardEventOnFocusChange();

  const { handleKeyDown }: SliderKeyboardKeyDownHook =
    useSliderKeyboardEventKeyDown(
      currentValue,
      minValue,
      maxValue,
      propagateNewValue,
      onPositionChange,
      onFocusChange,
    );

  const { handleKeyUp }: SliderKeyboardKeyUpHook =
    useSliderKeyboardEventKeyUp(onFocusChange);

  return { isFocused, handleKeyDown, handleKeyUp, onFocusChange };
};

export default useSliderKeyboardEvents;
