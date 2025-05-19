import "./Label.scss";
import React, { ReactElement } from "react";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import useLabelType from "@/hooks/label/useLabelType.ts";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";
import useWarnIfEmptyText from "@/hooks/label/useWarnIfEmptyText.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  type: LabelTypeEnum;
  text?: string;
}

const Label: React.FC<LabelProps> = React.memo(
  ({ type, text = EMPTY_STRING }: LabelProps): ReactElement => {
    const { ariaLabel, renderedText } = useLabelType(type, text);
    const isDarkModeOn: boolean = useDarkMode();
    useWarnIfEmptyText(text);

    return (
      <label
        className={`label label__${type} ${isDarkModeOn && `label__${type}--darkMode`}`}
        aria-label={ariaLabel}
      >
        {renderedText}
      </label>
    );
  },
);

export default Label;
