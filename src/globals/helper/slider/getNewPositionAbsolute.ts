import React from "react";
import { getErrorMessageContainerWidthIs0 } from "@/globals/constants/ErrorMessages.ts";

const getNewPositionAbsolute = (
  event: MouseEvent | React.MouseEvent,
  container: HTMLDivElement,
  maxValue: number,
): number => {
  const containerWidth: number = container.offsetWidth;

  if (containerWidth === 0) {
    throw new Error(getErrorMessageContainerWidthIs0(containerWidth));
  }

  const clickPosition: number =
    event.clientX - container.getBoundingClientRect().left;

  const newPositionRelative: number = clickPosition / containerWidth;

  return Math.round(newPositionRelative * maxValue);
};

export default getNewPositionAbsolute;
