import isNewPositionValid from "@/globals/utils/isNewPositionValid.ts";
import { getErrorMessageMinValueGreaterMaxValue } from "@/globals/constants/ErrorMessages.ts";

describe("isNewPositionValid function", (): void => {
  it.each([
    [true, true, true, 2, 1, 3],
    [false, true, false, 3, 1, 2],
    [false, false, true, 1, 2, 3],
  ])(
    "returns %s if newPositionUnitedAbsolute >= minValue is %s and newPositionUnitedAbsolute <= maxValue is %s",
    (
      expected: boolean,
      _: boolean,
      __: boolean,
      newPositionUnitedAbsolute: number,
      minValue: number,
      maxValue: number,
    ): void => {
      const receivedValue: boolean = isNewPositionValid(
        newPositionUnitedAbsolute,
        minValue,
        maxValue,
      );

      expect(receivedValue).toBe(expected);
    },
  );

  it("throws Error if minValue > maxValue", (): void => {
    const maxValue: number = 1;
    const minValueGreaterMaxValue: number = maxValue + 1;

    expect(() =>
      isNewPositionValid(0, minValueGreaterMaxValue, maxValue),
    ).toThrow(
      new Error(
        getErrorMessageMinValueGreaterMaxValue(
          minValueGreaterMaxValue,
          maxValue,
        ),
      ),
    );
  });
});
