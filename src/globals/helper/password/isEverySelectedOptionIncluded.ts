import {
  OptionItem,
  optionToCharacters,
} from "@/globals/constants/OptionItems.ts";
import { ERROR_MESSAGE_MISSING_OPTION } from "@/globals/constants/ErrorMessages.ts";

const isEverySelectedOptionIncluded = (
  password: string,
  currentOptions: OptionItem[],
): boolean => {
  if (!password) {
    return false;
  }
  if (!currentOptions.length) {
    throw new Error(ERROR_MESSAGE_MISSING_OPTION);
  }

  for (const option of currentOptions) {
    if (option.isChecked) {
      const characters: string = optionToCharacters[option.option];
      if (
        !characters
          .split("")
          .some((char: string): boolean => password.includes(char))
      ) {
        return false;
      }
    }
  }
  return true;
};

export default isEverySelectedOptionIncluded;
