import { getErrorMessageContainerWidthIs0 } from "@/globals/constants/ErrorMessages.ts";
import getNewPositionAbsolute from "@/globals/helper/slider/getNewPositionAbsolute.ts";
import { mockedDOMRect } from "@/jest/fixtures/DOMRectFixtures.ts";

describe("getNewPositionAbsolute function", (): void => {
  const clientX: number = 100;
  const event: MouseEvent = { clientX } as MouseEvent;
  const offsetWidth: number = 100;
  const containerXLeft: number = 50;
  const getBoundingClientRectMock: jest.Mock = jest.fn((): DOMRect => {
    return {
      ...mockedDOMRect,
      left: containerXLeft,
    };
  });
  const container: HTMLDivElement = {
    offsetWidth,
    getBoundingClientRect: getBoundingClientRectMock,
  } as unknown as HTMLDivElement;
  const maxValue: number = 100;

  it("returns new absolute position", (): void => {
    const expectedClickPosition: number = clientX - containerXLeft;
    const expectedNewPositionRelative: number =
      expectedClickPosition / offsetWidth;
    const expectedResult: number = Math.round(
      expectedNewPositionRelative * maxValue,
    );

    const receivedValue: number = getNewPositionAbsolute(
      event,
      container,
      maxValue,
    );

    expect(receivedValue).toEqual(expectedResult);
  });

  it("throws Error if containerWidth is 0", (): void => {
    const offsetWidth: number = 0;
    const containerWithWidth0: HTMLDivElement = {
      ...container,
      offsetWidth,
    } as HTMLDivElement;

    expect(() =>
      getNewPositionAbsolute(event, containerWithWidth0, maxValue),
    ).toThrow(new Error(getErrorMessageContainerWidthIs0(offsetWidth)));
  });
});
