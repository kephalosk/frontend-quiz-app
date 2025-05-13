import { useCallback, useState } from "react";
import { SliderMouseOnDraggingChangeHook } from "@/globals/models/types/SliderMouseTypes.ts";

const useSliderMouseEventOnDraggingChange =
  (): SliderMouseOnDraggingChangeHook => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const onDraggingChange = useCallback((newDragging: boolean): void => {
      setIsDragging(newDragging);
    }, []);

    return { isDragging, onDraggingChange };
  };

export default useSliderMouseEventOnDraggingChange;
