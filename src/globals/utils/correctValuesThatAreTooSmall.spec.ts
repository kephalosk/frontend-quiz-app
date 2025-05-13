import correctValuesThatAreTooSmall from "@/globals/utils/correctValuesThatAreTooSmall.ts";

describe("correctValuesThatAreTooSmall function", (): void => {
  const minValue: number = 1;

  it("returns minValue if newValue is smaller", (): void => {
    const newValue: number = minValue - 1;

    const receivedValue: number = correctValuesThatAreTooSmall(
      newValue,
      minValue,
    );

    expect(receivedValue).toEqual(minValue);
  });

  it("returns newValue if newValue is bigger than minValue", (): void => {
    const newValue: number = minValue + 1;

    const receivedValue: number = correctValuesThatAreTooSmall(
      newValue,
      minValue,
    );

    expect(receivedValue).toEqual(newValue);
  });
});
