import React, { useCallback, useRef } from "react";
import { SliderMouseUpdateHook } from "@/globals/models/types/SliderMouseTypes.ts";
import correctValuesThatAreTooSmall from "@/globals/utils/correctValuesThatAreTooSmall.ts";
import isNewPositionValid from "@/globals/utils/isNewPositionValid.ts";
import getNewPositionAbsolute from "@/globals/helper/slider/getNewPositionAbsolute.ts";
import { ERROR_MESSAGE_SLIDER_MOUSE_UPDATE_PREFIX } from "@/globals/constants/ErrorMessages.ts";

const useSliderMouseEventUpdate = (
  minValue: number,
  maxValue: number,
  propagateNewValue: (newValue: number) => void,
  onPositionChange: (newPositionPercent: number) => void,
): SliderMouseUpdateHook => {
  const containerRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback(
    (event: MouseEvent | React.MouseEvent): void => {
      try {
        if (containerRef.current) {
          const container: HTMLDivElement = containerRef.current;
          let newPositionUnitedAbsolute: number = getNewPositionAbsolute(
            event,
            container,
            maxValue,
          );

          newPositionUnitedAbsolute = correctValuesThatAreTooSmall(
            newPositionUnitedAbsolute,
            minValue,
          );

          if (
            !isNewPositionValid(newPositionUnitedAbsolute, minValue, maxValue)
          ) {
            return;
          }

          const newPositionUnitedRelative: number =
            (newPositionUnitedAbsolute / maxValue) * 100;

          onPositionChange(newPositionUnitedRelative);
          propagateNewValue(newPositionUnitedAbsolute);
        }
      } catch (error) {
        console.error(ERROR_MESSAGE_SLIDER_MOUSE_UPDATE_PREFIX, error);
      }
    },
    [maxValue, minValue, onPositionChange, propagateNewValue],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent): void => {
      updatePosition(event);
    },
    [updatePosition],
  );

  return { handleClick, containerRef, updatePosition };
};

export default useSliderMouseEventUpdate;
