import React, { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SliderBar from "@/components/atoms/Slider/SliderBar/SliderBar.tsx";
import SliderBarContainer, {
  SliderBarContainerProps,
} from "@/components/container/SliderBarContainer/SliderBarContainer.tsx";
import SliderBarValue from "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx";
import SliderBarAdjuster from "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx";
import {
  CHARACTER_LENGTH_MAX_VALUE,
  CHARACTER_LENGTH_MIN_VALUE,
  OFFSET_ADJUSTER,
} from "@/globals/config.ts";
import useSliderPosition from "@/hooks/slider/useSliderPosition.ts";
import useSliderMouseEvents from "@/hooks/slider/useSliderMouseEvents.ts";
import useSliderKeyboardEvents from "@/hooks/slider/useSliderKeyboardEvents.ts";
import { SliderPositionHook } from "@/globals/models/types/SliderPositionTypes.ts";
import { SliderMouseHook } from "@/globals/models/types/SliderMouseTypes.ts";
import { SliderKeyboardHook } from "@/globals/models/types/SliderKeyboardTypes.ts";

const sliderBarDataTestId: string = "slider-bar";
jest.mock(
  "@/components/atoms/Slider/SliderBar/SliderBar.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={sliderBarDataTestId}>{props.children}</div>;
    }),
);

const sliderBarValueDataTestId: string = "slider-bar-value";
jest.mock(
  "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderBarValueDataTestId}></div>;
    }),
);

const sliderBarAdjusterDataTestId: string = "slider-bar-adjuster";
jest.mock(
  "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderBarAdjusterDataTestId}></div>;
    }),
);

jest.mock(
  "@/hooks/slider/useSliderPosition.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/slider/useSliderMouseEvents.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/slider/useSliderKeyboardEvents.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("SliderBarContainer Component", (): void => {
  const currentValue: number = CHARACTER_LENGTH_MIN_VALUE;
  const minValue: number = CHARACTER_LENGTH_MIN_VALUE;
  const maxValue: number = CHARACTER_LENGTH_MAX_VALUE;
  const propagateNewValueMock: jest.Mock = jest.fn();

  const setup = (
    propsOverride?: Partial<SliderBarContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: SliderBarContainerProps = {
      currentValue,
      minValue,
      maxValue,
      propagateNewValue: propagateNewValueMock,
    };

    const props: SliderBarContainerProps = {
      ...defaultProps,
      ...propsOverride,
    };
    return render(<SliderBarContainer {...props} />);
  };

  const positionPercentMock: number = 1;
  const onPositionChangeMock: jest.Mock = jest.fn();
  const useSliderPositionMock: SliderPositionHook = {
    positionPercent: positionPercentMock,
    onPositionChange: onPositionChangeMock,
  };

  const isDraggingMock: boolean = false;
  const handleMouseDownMock: jest.Mock = jest.fn();
  const handleClickMock: jest.Mock = jest.fn();
  const containerRefMock: React.RefObject<HTMLDivElement | null> = {
    current: null,
  };
  const useSliderMouseEventsMock: SliderMouseHook = {
    isDragging: isDraggingMock,
    handleMouseDown: handleMouseDownMock,
    handleClick: handleClickMock,
    containerRef: containerRefMock,
  };

  const isFocusedMock: boolean = false;
  const handleKeyDownMock: jest.Mock = jest.fn();
  const handleKeyUpMock: jest.Mock = jest.fn();
  const useSliderKeyboardEventsMock: Partial<SliderKeyboardHook> = {
    isFocused: isFocusedMock,
    handleKeyDown: handleKeyDownMock,
    handleKeyUp: handleKeyUpMock,
  };

  beforeEach((): void => {
    (useSliderPosition as jest.Mock).mockReturnValue(useSliderPositionMock);
    (useSliderMouseEvents as jest.Mock).mockReturnValue(
      useSliderMouseEventsMock,
    );
    (useSliderKeyboardEvents as jest.Mock).mockReturnValue(
      useSliderKeyboardEventsMock,
    );
  });

  it("renders div sliderBarContainerWrapper", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerWrapper",
    );
    element!.focus();

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("tabIndex", "0");
    expect(document.activeElement).toBe(element);
  });

  it("calls handleClick on click in sliderBarContainerWrapper", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerWrapper",
    );
    fireEvent.click(element!);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: "onClick" }),
    );
  });

  it("calls handleMouseDown on mouse down in sliderBarContainerWrapper", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerWrapper",
    );
    fireEvent.mouseDown(element!);

    expect(handleMouseDownMock).toHaveBeenCalledTimes(1);
    expect(handleMouseDownMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: "onMouseDown" }),
    );
  });

  it("calls handleKeyDown on key down in sliderBarContainerWrapper", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerWrapper",
    );
    fireEvent.keyDown(element!);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
    expect(handleKeyDownMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: "onKeyDown" }),
    );
  });

  it("calls handleKeyUp on key down in sliderBarContainerWrapper", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerWrapper",
    );
    fireEvent.keyUp(element!);

    expect(handleKeyUpMock).toHaveBeenCalledTimes(1);
    expect(handleKeyUpMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: "onKeyUp" }),
    );
  });

  it("renders div sliderBarContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainer",
    );

    expect(element).toBeInTheDocument();
    expect(containerRefMock.current).toBe(element);
  });

  it("renders component SliderBar", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderBarDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderBar).toHaveBeenCalledTimes(1);
    expect(SliderBar).toHaveBeenCalledWith(
      { children: expect.any(Array) },
      undefined,
    );
  });

  it("renders span sliderBarContainerValue", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerValue",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("style", `width: ${positionPercentMock}%;`);
  });

  it("renders component SliderBarValue", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderBarValueDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderBarValue).toHaveBeenCalledTimes(1);
    expect(SliderBarValue).toHaveBeenCalledWith({}, undefined);
  });

  it("renders span sliderBarContainerAdjuster", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerAdjuster",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute(
      "style",
      `left: calc(${positionPercentMock}% - ${OFFSET_ADJUSTER}px);`,
    );
  });

  it.each([
    [true, true, true],
    [true, true, false],
    [false, false, false],
    [true, false, true],
  ])(
    "renders component SliderBarAdjuster with prop isClicked === %s when isDragging === false and isFocused === false",
    (isClicked: boolean, isDragging: boolean, isFocused: boolean): void => {
      (useSliderMouseEvents as jest.Mock).mockReturnValue({
        ...useSliderMouseEventsMock,
        isDragging,
      });
      (useSliderKeyboardEvents as jest.Mock).mockReturnValue({
        ...useSliderKeyboardEventsMock,
        isFocused,
      });
      setup();

      const element: HTMLElement = screen.getByTestId(
        sliderBarAdjusterDataTestId,
      );

      expect(element).toBeInTheDocument();
      expect(SliderBarAdjuster).toHaveBeenCalledTimes(1);
      expect(SliderBarAdjuster).toHaveBeenCalledWith(
        {
          isClicked,
        },
        undefined,
      );
    },
  );

  it("calls hook useSliderPosition", (): void => {
    setup();

    expect(useSliderPosition).toHaveBeenCalledTimes(1);
    expect(useSliderPosition).toHaveBeenCalledWith(currentValue, maxValue);
  });

  it("calls hook useSliderMouseEvents", (): void => {
    setup();

    expect(useSliderMouseEvents).toHaveBeenCalledTimes(1);
    expect(useSliderMouseEvents).toHaveBeenCalledWith(
      minValue,
      maxValue,
      propagateNewValueMock,
      onPositionChangeMock,
    );
  });

  it("calls hook useSliderKeyboardEvents", (): void => {
    setup();

    expect(useSliderKeyboardEvents).toHaveBeenCalledTimes(1);
    expect(useSliderKeyboardEvents).toHaveBeenCalledWith(
      currentValue,
      minValue,
      maxValue,
      propagateNewValueMock,
      onPositionChangeMock,
    );
  });
});
