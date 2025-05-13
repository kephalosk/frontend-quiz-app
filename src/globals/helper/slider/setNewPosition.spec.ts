import {
  CHARACTER_LENGTH_MAX_VALUE,
  CHARACTER_LENGTH_MIN_VALUE,
} from "@/globals/config.ts";
import setNewPosition from "@/globals/helper/slider/setNewPosition.ts";
import {
  getErrorMessageMaxValueLess0,
  getErrorMessageNewPositionGreaterMaxValue,
  getErrorMessageNewPositionLess0,
} from "@/globals/constants/ErrorMessages.ts";

describe("setNewPosition function", (): void => {
  const newPosition: number = CHARACTER_LENGTH_MIN_VALUE;
  const maxValue: number = CHARACTER_LENGTH_MAX_VALUE;
  const propagateNewValueMock: jest.Mock = jest.fn();
  const onPositionChangeMock: jest.Mock = jest.fn();

  it("calls onPositionChange with relative newPosition", (): void => {
    const expectedRelativeNewPosition: number = (newPosition / maxValue) * 100;

    setNewPosition(
      newPosition,
      maxValue,
      propagateNewValueMock,
      onPositionChangeMock,
    );

    expect(onPositionChangeMock).toHaveBeenCalledTimes(1);
    expect(onPositionChangeMock).toHaveBeenCalledWith(
      expectedRelativeNewPosition,
    );
  });

  it("calls propagateNewValue with newPosition", (): void => {
    setNewPosition(
      newPosition,
      maxValue,
      propagateNewValueMock,
      onPositionChangeMock,
    );

    expect(propagateNewValueMock).toHaveBeenCalledTimes(1);
    expect(propagateNewValueMock).toHaveBeenCalledWith(newPosition);
  });

  it("works correctly when newPosition is valid", (): void => {
    const expectedRelativePosition: number = (newPosition / maxValue) * 100;

    setNewPosition(
      newPosition,
      maxValue,
      propagateNewValueMock,
      onPositionChangeMock,
    );

    expect(onPositionChangeMock).toHaveBeenCalledWith(expectedRelativePosition);
    expect(propagateNewValueMock).toHaveBeenCalledWith(newPosition);
  });

  it("throws error if maxValue === 0", (): void => {
    const maxValueZero: number = 0;

    expect(() =>
      setNewPosition(
        newPosition,
        maxValueZero,
        propagateNewValueMock,
        onPositionChangeMock,
      ),
    ).toThrow(new Error(getErrorMessageMaxValueLess0(maxValueZero)));
  });

  it("throws error if maxValue < 0", (): void => {
    const maxValueNegative: number = -10;

    expect(() =>
      setNewPosition(
        newPosition,
        maxValueNegative,
        propagateNewValueMock,
        onPositionChangeMock,
      ),
    ).toThrow(new Error(getErrorMessageMaxValueLess0(maxValueNegative)));
  });

  it("throws error if newPosition > maxValue", (): void => {
    const newPositionGreaterMaxValue: number = maxValue + 1;

    expect(() =>
      setNewPosition(
        newPositionGreaterMaxValue,
        maxValue,
        propagateNewValueMock,
        onPositionChangeMock,
      ),
    ).toThrow(
      new Error(
        getErrorMessageNewPositionGreaterMaxValue(
          newPositionGreaterMaxValue,
          maxValue,
        ),
      ),
    );
  });

  it("throws error if newPosition < 0", (): void => {
    const newPositionNegative: number = -10;

    expect(() =>
      setNewPosition(
        newPositionNegative,
        maxValue,
        propagateNewValueMock,
        onPositionChangeMock,
      ),
    ).toThrow(new Error(getErrorMessageNewPositionLess0(newPositionNegative)));
  });
});
