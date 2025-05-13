import { useCallback } from "react";
import { SliderMouseMouseDownHook } from "@/globals/models/types/SliderMouseTypes.ts";

const useSliderMouseEventMouseDown = (
  onDraggingChange: (newDragging: boolean) => void,
): SliderMouseMouseDownHook => {
  const handleMouseDown = useCallback((): void => {
    onDraggingChange(true);
  }, [onDraggingChange]);

  return { handleMouseDown };
};

export default useSliderMouseEventMouseDown;
