import "./SliderHeaderContainer.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { SLIDER_HEADER_LABEL_TEXT } from "@/globals/constants/Constants.ts";
import useCharacterLength from "@/hooks/redux/characterLength/useCharacterLength.ts";

const SliderHeaderContainer: React.FC = (): ReactElement => {
  const characterLength: number = useCharacterLength();
  const characterLengthString: string = characterLength.toString();

  return (
    <div className="sliderHeaderContainer">
      <span className="sliderHeaderContainerSpace">
        <Label
          type={LabelTypeEnum.HEADER_LABEL}
          text={SLIDER_HEADER_LABEL_TEXT}
        />
      </span>
      <Label type={LabelTypeEnum.NUMBER_LABEL} text={characterLengthString} />
    </div>
  );
};

export default SliderHeaderContainer;
