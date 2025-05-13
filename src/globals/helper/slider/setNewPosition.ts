import {
  getErrorMessageMaxValueLess0,
  getErrorMessageNewPositionGreaterMaxValue,
  getErrorMessageNewPositionLess0,
} from "@/globals/constants/ErrorMessages.ts";

const setNewPosition = (
  newPosition: number,
  maxValue: number,
  propagateNewValue: (newValue: number) => void,
  onPositionChange: (newPositionPercent: number) => void,
): void => {
  if (maxValue <= 0) {
    throw new Error(getErrorMessageMaxValueLess0(maxValue));
  }

  if (newPosition > maxValue) {
    throw new Error(
      getErrorMessageNewPositionGreaterMaxValue(newPosition, maxValue),
    );
  }

  if (newPosition < 0) {
    throw new Error(getErrorMessageNewPositionLess0(newPosition));
  }

  const newPositionUnitedRelative: number = (newPosition / maxValue) * 100;

  onPositionChange(newPositionUnitedRelative);
  propagateNewValue(newPosition);
};

export default setNewPosition;
