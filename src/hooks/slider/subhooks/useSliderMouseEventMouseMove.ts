import React, { useCallback } from "react";
import { SliderMouseMouseMoveHook } from "@/globals/models/types/SliderMouseTypes.ts";

const useSliderMouseEventMouseMove = (
  isDragging: boolean,
  clearTimeoutId: () => void,
  updatePosition: (event: MouseEvent | React.MouseEvent) => void,
  setTimeoutId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>,
): SliderMouseMouseMoveHook => {
  const handleMouseMove = useCallback(
    (event: MouseEvent | React.MouseEvent): void => {
      if (isDragging) {
        clearTimeoutId();

        const newTimeoutId: NodeJS.Timeout = setTimeout((): void => {
          updatePosition(event);
        }, 10);

        setTimeoutId(newTimeoutId);
      }
    },
    [clearTimeoutId, isDragging, setTimeoutId, updatePosition],
  );

  return { handleMouseMove };
};

export default useSliderMouseEventMouseMove;
