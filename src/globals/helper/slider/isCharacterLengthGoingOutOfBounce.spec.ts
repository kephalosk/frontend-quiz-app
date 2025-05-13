import isCharacterLengthGoingOutOfBounce from "@/globals/helper/slider/isCharacterLengthGoingOutOfBounce.ts";
import React from "react";
import {
  getErrorMessageEventKeyNeitherArrowLeftNorArrowRight,
  getErrorMessageMinValueGreaterMaxValue,
} from "@/globals/constants/ErrorMessages.ts";

describe("isCharacterLengthGoingOutOfBounce function", (): void => {
  const event: React.KeyboardEvent = {
    key: "ArrowLeft",
  } as React.KeyboardEvent;
  const currentValue: number = 5;
  const minValue: number = 1;
  const maxValue: number = 10;

  it.each([
    [true, 1, 2],
    [true, 2, 2],
    [false, 3, 2],
  ])(
    "returns %s for %s <= %s in case of ArrowLeft",
    (expectedResult: boolean, currentValue: number, minValue: number): void => {
      const receivedResult: boolean = isCharacterLengthGoingOutOfBounce(
        { ...event, key: "ArrowLeft" },
        currentValue,
        minValue,
        maxValue,
      );

      expect(receivedResult).toBe(expectedResult);
    },
  );

  it.each([
    [true, 3, 2],
    [true, 2, 2],
    [false, 1, 2],
  ])(
    "returns %s for %s >= %s in case of ArrowRight",
    (expectedResult: boolean, currentValue: number, maxValue: number): void => {
      const receivedResult: boolean = isCharacterLengthGoingOutOfBounce(
        { ...event, key: "ArrowRight" },
        currentValue,
        minValue,
        maxValue,
      );

      expect(receivedResult).toBe(expectedResult);
    },
  );

  it("throws error if event.key is neither ArrowLeft nor ArrowRight", (): void => {
    const eventWithInvalidKey: React.KeyboardEvent = {
      key: "Enter",
    } as React.KeyboardEvent;

    expect(() =>
      isCharacterLengthGoingOutOfBounce(
        eventWithInvalidKey,
        currentValue,
        minValue,
        maxValue,
      ),
    ).toThrow(
      new Error(
        getErrorMessageEventKeyNeitherArrowLeftNorArrowRight(
          eventWithInvalidKey.key,
        ),
      ),
    );
  });

  it("throws error if minValue is greater than maxValue", (): void => {
    const minValueGreaterMaxValue: number = maxValue + 1;

    expect(() =>
      isCharacterLengthGoingOutOfBounce(
        event,
        currentValue,
        minValueGreaterMaxValue,
        maxValue,
      ),
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
