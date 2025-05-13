import { useCallback } from "react";
import { SliderKeyboardKeyUpHook } from "@/globals/models/types/SliderKeyboardTypes.ts";

const useSliderKeyboardEventKeyUp = (
  onFocusChange: (newFocus: boolean) => void,
): SliderKeyboardKeyUpHook => {
  const handleKeyUp = useCallback((): void => {
    onFocusChange(false);
  }, [onFocusChange]);

  return { handleKeyUp };
};

export default useSliderKeyboardEventKeyUp;
