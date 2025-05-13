import React from "react";
import {
  getErrorMessageEventKeyNeitherArrowLeftNorArrowRight,
  getErrorMessageMinValueGreaterMaxValue,
} from "@/globals/constants/ErrorMessages.ts";

const isCharacterLengthGoingOutOfBounce = (
  event: React.KeyboardEvent,
  currentValue: number,
  minValue: number,
  maxValue: number,
): boolean => {
  if (minValue > maxValue) {
    throw new Error(getErrorMessageMinValueGreaterMaxValue(minValue, maxValue));
  }

  if (event.key != "ArrowLeft" && event.key != "ArrowRight") {
    throw new Error(
      getErrorMessageEventKeyNeitherArrowLeftNorArrowRight(event.key),
    );
  }

  if (event.key === "ArrowLeft") {
    return currentValue <= minValue;
  } else {
    return currentValue >= maxValue;
  }
};

export default isCharacterLengthGoingOutOfBounce;
