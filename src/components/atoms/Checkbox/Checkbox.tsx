import "./Checkbox.scss";
import React, { ReactElement } from "react";
import { CHECK_ICON_SRC } from "@/globals/constants/Ressources.ts";
import { CHECKBOX_ICON_ALT_TEXT } from "@/globals/constants/Constants.ts";
import clsx from "clsx";

export interface CheckboxProps {
  isChecked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
}: CheckboxProps): ReactElement => {
  return (
    <div className={clsx("checkbox", { isChecked })}>
      <img
        className={clsx("checkboxIcon", { isChecked })}
        src={CHECK_ICON_SRC}
        alt={CHECKBOX_ICON_ALT_TEXT}
        aria-hidden={true}
      />
    </div>
  );
};

export default Checkbox;
