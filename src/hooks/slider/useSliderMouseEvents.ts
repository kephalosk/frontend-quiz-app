import {
  SliderMouseHook,
  SliderMouseMouseDownHook,
  SliderMouseMouseMoveHook,
  SliderMouseMouseUpHook,
  SliderMouseOnDraggingChangeHook,
  SliderMouseTimeoutHook,
  SliderMouseUpdateHook,
} from "@/globals/models/types/SliderMouseTypes.ts";
import useSliderMouseEventUpdate from "@/hooks/slider/subhooks/useSliderMouseEventUpdate.ts";
import useSliderMouseEventOnDraggingChange from "@/hooks/slider/subhooks/useSliderMouseEventOnDraggingChange.ts";
import useSliderMouseEventMouseDown from "@/hooks/slider/subhooks/useSliderMouseEventMouseDown.ts";
import useSliderMouseEventMouseUp from "@/hooks/slider/subhooks/useSliderMouseEventMouseUp.ts";
import useSliderMouseEventMouseMove from "@/hooks/slider/subhooks/useSliderMouseEventMouseMove.ts";
import useSliderMouseEventTimeout from "@/hooks/slider/subhooks/useSliderMouseEventTimeout.ts";
import useSliderMouseEventListener from "@/hooks/slider/subhooks/useSliderMouseEventListener.ts";

const useSliderMouseEvents = (
  minValue: number,
  maxValue: number,
  propagateNewValue: (newValue: number) => void,
  onPositionChange: (newPositionPercent: number) => void,
): SliderMouseHook => {
  const { setTimeoutId, clearTimeoutId }: SliderMouseTimeoutHook =
    useSliderMouseEventTimeout();

  const { isDragging, onDraggingChange }: SliderMouseOnDraggingChangeHook =
    useSliderMouseEventOnDraggingChange();

  const { handleClick, containerRef, updatePosition }: SliderMouseUpdateHook =
    useSliderMouseEventUpdate(
      minValue,
      maxValue,
      propagateNewValue,
      onPositionChange,
    );

  const { handleMouseDown }: SliderMouseMouseDownHook =
    useSliderMouseEventMouseDown(onDraggingChange);

  const { handleMouseUp }: SliderMouseMouseUpHook = useSliderMouseEventMouseUp(
    onDraggingChange,
    clearTimeoutId,
  );

  const { handleMouseMove }: SliderMouseMouseMoveHook =
    useSliderMouseEventMouseMove(
      isDragging,
      clearTimeoutId,
      updatePosition,
      setTimeoutId,
    );

  useSliderMouseEventListener(isDragging, handleMouseMove, handleMouseUp);

  return {
    isDragging,
    handleMouseDown,
    handleClick,
    containerRef,
  };
};

export default useSliderMouseEvents;
