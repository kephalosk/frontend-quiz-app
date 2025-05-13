import { OptionItem } from "@/globals/constants/OptionItems.ts";
import { OptionEnum } from "@/globals/models/enums/OptionEnum.ts";
import {
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPERCASE_LETTERS,
} from "@/globals/constants/Characters.ts";

const getAvailableCharacters = (currentOptions: OptionItem[]): string => {
  let availableCharacters: string = "";

  if (
    currentOptions.some(
      (option: OptionItem) =>
        option.option === OptionEnum.UPPERCASE_LETTERS && option.isChecked,
    )
  ) {
    availableCharacters += UPPERCASE_LETTERS;
  }
  if (
    currentOptions.some(
      (option: OptionItem) =>
        option.option === OptionEnum.LOWERCASE_LETTERS && option.isChecked,
    )
  ) {
    availableCharacters += LOWERCASE_LETTERS;
  }
  if (
    currentOptions.some(
      (option: OptionItem) =>
        option.option === OptionEnum.NUMBERS && option.isChecked,
    )
  ) {
    availableCharacters += NUMBERS;
  }
  if (
    currentOptions.some(
      (option: OptionItem) =>
        option.option === OptionEnum.SYMBOLS && option.isChecked,
    )
  ) {
    availableCharacters += SYMBOLS;
  }
  return availableCharacters;
};

export default getAvailableCharacters;
