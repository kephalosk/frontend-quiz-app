import { useCallback, useState } from "react";
import { SliderKeyboardFocusHook } from "@/globals/models/types/SliderKeyboardTypes.ts";

const useSliderKeyboardEventOnFocusChange = (): SliderKeyboardFocusHook => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocusChange = useCallback((newFocus: boolean): void => {
    setIsFocused(newFocus);
  }, []);

  return { isFocused, onFocusChange };
};

export default useSliderKeyboardEventOnFocusChange;
