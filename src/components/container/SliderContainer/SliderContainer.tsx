import "./SliderContainer.scss";
import React, { ReactElement } from "react";
import SliderHeaderContainer from "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx";
import SliderBarContainer from "@/components/container/SliderBarContainer/SliderBarContainer.tsx";
import {
  CHARACTER_LENGTH_MAX_VALUE,
  CHARACTER_LENGTH_MIN_VALUE,
} from "@/globals/config.ts";
import useUpdateCharacterLength from "@/hooks/redux/characterLength/useUpdateCharacterLength.ts";
import useCharacterLength from "@/hooks/redux/characterLength/useCharacterLength.ts";

const SliderContainer: React.FC = (): ReactElement => {
  const characterLength: number = useCharacterLength();
  const handleValueChange: (newValue: number) => void =
    useUpdateCharacterLength();

  return (
    <div className="sliderContainer">
      <SliderHeaderContainer />
      <SliderBarContainer
        currentValue={characterLength}
        minValue={CHARACTER_LENGTH_MIN_VALUE}
        maxValue={CHARACTER_LENGTH_MAX_VALUE}
        propagateNewValue={handleValueChange}
      />
    </div>
  );
};

export default SliderContainer;
