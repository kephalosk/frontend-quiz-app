import "./ContentContainer.scss";
import SliderContainer from "@/components/container/SliderContainer/SliderContainer.tsx";
import OptionContainer from "@/components/container/OptionContainer/OptionContainer.tsx";
import StrengthContainer from "@/components/container/StrengthContainer/StrengthContainer.tsx";
import SubmitButton from "@/components/atoms/SubmitButton/SubmitButton.tsx";
import { BUTTON_TEXT } from "@/globals/constants/Constants.ts";
import React from "react";
import { PasswordProcessingHook } from "@/globals/models/types/PasswordProcessingTypes.ts";
import usePasswordProcessing from "@/hooks/password/usePasswordProcessing.ts";

export interface ContentContainerProps {
  propagateValue: (value: string) => void;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  propagateValue,
}: ContentContainerProps) => {
  const { handlePasswordGeneration }: PasswordProcessingHook =
    usePasswordProcessing(propagateValue);

  return (
    <div className="contentContainer">
      <SliderContainer />
      <OptionContainer />
      <StrengthContainer />
      <SubmitButton
        text={BUTTON_TEXT}
        handleButtonClick={handlePasswordGeneration}
      />
    </div>
  );
};

export default ContentContainer;
