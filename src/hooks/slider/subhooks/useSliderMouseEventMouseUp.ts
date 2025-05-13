import { useCallback } from "react";
import { SliderMouseMouseUpHook } from "@/globals/models/types/SliderMouseTypes.ts";

const useSliderMouseEventMouseUp = (
  onDraggingChange: (newDragging: boolean) => void,
  clearTimeoutId: () => void,
): SliderMouseMouseUpHook => {
  const handleMouseUp = useCallback((): void => {
    onDraggingChange(false);
    clearTimeoutId();
  }, [clearTimeoutId, onDraggingChange]);

  return { handleMouseUp };
};

export default useSliderMouseEventMouseUp;
