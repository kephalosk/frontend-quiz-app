import "./SliderBarContainer.scss";
import React, { ReactElement } from "react";
import SliderBar from "@/components/atoms/Slider/SliderBar/SliderBar.tsx";
import SliderBarValue from "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx";
import SliderBarAdjuster from "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx";
import { OFFSET_ADJUSTER } from "@/globals/config.ts";
import useSliderMouseEvents from "@/hooks/slider/useSliderMouseEvents.ts";
import useSliderKeyboardEvents from "@/hooks/slider/useSliderKeyboardEvents.ts";
import useSliderPosition from "@/hooks/slider/useSliderPosition.ts";
import { SliderKeyboardHook } from "@/globals/models/types/SliderKeyboardTypes.ts";

export interface SliderBarContainerProps {
  currentValue: number;
  minValue: number;
  maxValue: number;
  propagateNewValue: (newValue: number) => void;
}

const SliderBarContainer: React.FC<SliderBarContainerProps> = ({
  currentValue,
  minValue,
  maxValue,
  propagateNewValue,
}: SliderBarContainerProps): ReactElement => {
  const { positionPercent, onPositionChange } = useSliderPosition(
    currentValue,
    maxValue,
  );
  const { isDragging, handleMouseDown, handleClick, containerRef } =
    useSliderMouseEvents(
      minValue,
      maxValue,
      propagateNewValue,
      onPositionChange,
    );
  const { isFocused, handleKeyDown, handleKeyUp }: SliderKeyboardHook =
    useSliderKeyboardEvents(
      currentValue,
      minValue,
      maxValue,
      propagateNewValue,
      onPositionChange,
    );

  return (
    <div
      className="sliderBarContainerWrapper"
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleClick(event)
      }
      onMouseDown={handleMouseDown}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
        handleKeyDown(event)
      }
      onKeyUp={handleKeyUp}
      tabIndex={0}
    >
      <div ref={containerRef} className="sliderBarContainer">
        <SliderBar>
          <span
            className="sliderBarContainerValue"
            style={{ width: `${positionPercent}%` }}
          >
            <SliderBarValue />
          </span>
          <span
            className="sliderBarContainerAdjuster"
            style={{ left: `calc(${positionPercent}% - ${OFFSET_ADJUSTER}px)` }}
          >
            <SliderBarAdjuster isClicked={isDragging || isFocused} />
          </span>
        </SliderBar>
      </div>
    </div>
  );
};

export default SliderBarContainer;
