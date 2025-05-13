import { OptionEnum } from "@/globals/models/enums/OptionEnum.ts";
import { OptionKeyEnum } from "@/globals/models/enums/OptionKeyEnum.ts";
import {
  LOWERCASE_LETTERS,
  LOWERCASE_LETTERS_POSSIBILITIES,
  NUMBERS,
  NUMBERS_POSSIBILITIES,
  SYMBOLS,
  SYMBOLS_POSSIBILITIES,
  UPPERCASE_LETTERS,
  UPPERCASE_LETTERS_POSSIBILITIES,
} from "@/globals/constants/Characters.ts";

export interface OptionItem {
  key: OptionKeyEnum;
  option: OptionEnum;
  possibilities: number;
  isChecked: boolean;
}

export const OptionItems: OptionItem[] = [
  {
    key: OptionKeyEnum.UPPERCASE_LETTERS,
    option: OptionEnum.UPPERCASE_LETTERS,
    possibilities: UPPERCASE_LETTERS_POSSIBILITIES,
    isChecked: false,
  },
  {
    key: OptionKeyEnum.LOWERCASE_LETTERS,
    option: OptionEnum.LOWERCASE_LETTERS,
    possibilities: LOWERCASE_LETTERS_POSSIBILITIES,
    isChecked: false,
  },
  {
    key: OptionKeyEnum.NUMBERS,
    option: OptionEnum.NUMBERS,
    possibilities: NUMBERS_POSSIBILITIES,
    isChecked: false,
  },
  {
    key: OptionKeyEnum.SYMBOLS,
    option: OptionEnum.SYMBOLS,
    possibilities: SYMBOLS_POSSIBILITIES,
    isChecked: false,
  },
];

export const optionToCharacters: {
  [OptionEnum.UPPERCASE_LETTERS]: string;
  [OptionEnum.LOWERCASE_LETTERS]: string;
  [OptionEnum.NUMBERS]: string;
  [OptionEnum.SYMBOLS]: string;
} = {
  [OptionEnum.UPPERCASE_LETTERS]: UPPERCASE_LETTERS,
  [OptionEnum.LOWERCASE_LETTERS]: LOWERCASE_LETTERS,
  [OptionEnum.NUMBERS]: NUMBERS,
  [OptionEnum.SYMBOLS]: SYMBOLS,
};
