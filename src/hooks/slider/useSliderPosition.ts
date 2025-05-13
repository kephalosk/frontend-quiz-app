import { useCallback, useState } from "react";
import { SliderPositionHook } from "@/globals/models/types/SliderPositionTypes.ts";

const useSliderPosition = (
  currentValue: number,
  maxValue: number,
): SliderPositionHook => {
  const [positionPercent, setPositionPercent] = useState<number>(
    (currentValue / maxValue) * 100,
  );
  const onPositionChange = useCallback((newPositionPercent: number) => {
    setPositionPercent(newPositionPercent);
  }, []);

  return { positionPercent, onPositionChange };
};

export default useSliderPosition;
