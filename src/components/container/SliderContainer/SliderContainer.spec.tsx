import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import SliderContainer from "@/components/container/SliderContainer/SliderContainer.tsx";
import SliderHeaderContainer from "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx";
import SliderBarContainer from "@/components/container/SliderBarContainer/SliderBarContainer.tsx";
import {
  CHARACTER_LENGTH_MAX_VALUE,
  CHARACTER_LENGTH_MIN_VALUE,
} from "@/globals/config.ts";
import useCharacterLength from "@/hooks/redux/characterLength/useCharacterLength.ts";
import useUpdateCharacterLength from "@/hooks/redux/characterLength/useUpdateCharacterLength.ts";

const sliderHeaderDataTestId: string = "slider-header";
jest.mock(
  "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderHeaderDataTestId}></div>;
    }),
);

const sliderBarDataTestId: string = "slider-bar";
jest.mock(
  "@/components/container/SliderBarContainer/SliderBarContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderBarDataTestId}></div>;
    }),
);

jest.mock(
  "@/hooks/redux/characterLength/useCharacterLength.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/characterLength/useUpdateCharacterLength.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("SliderContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<SliderContainer />);
  };

  const characterLengthMock: number = 21;
  const handleValueChangeMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useCharacterLength as jest.Mock).mockReturnValue(characterLengthMock);
    (useUpdateCharacterLength as jest.Mock).mockReturnValue(
      handleValueChangeMock,
    );
  });

  it("renders div sliderContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".sliderContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component SliderHeaderContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderHeaderDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderHeaderContainer).toHaveBeenCalledTimes(1);
    expect(SliderHeaderContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component SliderBarContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderBarDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderBarContainer).toHaveBeenCalledTimes(1);
    expect(SliderBarContainer).toHaveBeenCalledWith(
      {
        currentValue: characterLengthMock,
        minValue: CHARACTER_LENGTH_MIN_VALUE,
        maxValue: CHARACTER_LENGTH_MAX_VALUE,
        propagateNewValue: handleValueChangeMock,
      },
      undefined,
    );
  });

  it("calls hook useCharacterLength", (): void => {
    setup();

    expect(useCharacterLength).toHaveBeenCalledTimes(1);
    expect(useCharacterLength).toHaveBeenCalledWith();
  });

  it("calls hook useUpdateCharacterLength", (): void => {
    setup();

    expect(useUpdateCharacterLength).toHaveBeenCalledTimes(1);
    expect(useUpdateCharacterLength).toHaveBeenCalledWith();
  });
});
