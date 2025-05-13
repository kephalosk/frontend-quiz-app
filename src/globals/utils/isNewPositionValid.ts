import { getErrorMessageMinValueGreaterMaxValue } from "@/globals/constants/ErrorMessages.ts";

const isNewPositionValid = (
  newPositionUnitedAbsolute: number,
  minValue: number,
  maxValue: number,
): boolean => {
  if (minValue > maxValue) {
    throw new Error(getErrorMessageMinValueGreaterMaxValue(minValue, maxValue));
  }

  return (
    newPositionUnitedAbsolute >= minValue &&
    newPositionUnitedAbsolute <= maxValue
  );
};

export default isNewPositionValid;
