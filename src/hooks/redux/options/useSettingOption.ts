import { OptionItem } from "@/globals/constants/OptionItems.ts";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { OptionEnum } from "@/globals/models/enums/OptionEnum.ts";
import {
  setLowercaseOption,
  setNumbersOption,
  setSymbolsOption,
  setUppercaseOption,
} from "@/redux/slices/optionSlice.ts";

const useSettingOption = () => {
  const dispatch: Dispatch = useDispatch();

  const settingOption = useCallback(
    (option: OptionItem): void => {
      switch (option.option) {
        case OptionEnum.UPPERCASE_LETTERS:
          dispatch(setUppercaseOption(!option.isChecked));
          break;
        case OptionEnum.LOWERCASE_LETTERS:
          dispatch(setLowercaseOption(!option.isChecked));
          break;
        case OptionEnum.NUMBERS:
          dispatch(setNumbersOption(!option.isChecked));
          break;
        case OptionEnum.SYMBOLS:
          dispatch(setSymbolsOption(!option.isChecked));
          break;
      }
    },
    [dispatch],
  );

  return { settingOption };
};

export default useSettingOption;
