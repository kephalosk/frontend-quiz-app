import "./OptionContainer.scss";
import { OptionItem } from "@/globals/constants/OptionItems.ts";
import CheckboxContainer from "@/components/container/CheckboxContainer/CheckboxContainer.tsx";
import { ReactElement } from "react";
import useCurrentOptions from "@/hooks/redux/options/useCurrentOptions.ts";
import useSettingOption from "@/hooks/redux/options/useSettingOption.ts";

const OptionContainer = () => {
  const { currentOptions } = useCurrentOptions();
  const { settingOption } = useSettingOption();

  return (
    <div className="optionContainer">
      {currentOptions.map((option: OptionItem, index: number): ReactElement => {
        return (
          <CheckboxContainer
            key={index}
            option={option.option}
            isChecked={option.isChecked}
            handleOptionClick={() => settingOption(option)}
          />
        );
      })}
    </div>
  );
};

export default OptionContainer;
