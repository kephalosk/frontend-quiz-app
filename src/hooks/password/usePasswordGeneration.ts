import { OptionItem } from "@/globals/constants/OptionItems.ts";
import { PasswordGenerationHook } from "@/globals/models/types/PasswordGenerationTypes.ts";
import getAvailableCharacters from "@/globals/helper/password/getAvailableCharacters.ts";
import calculatePassword from "@/globals/helper/password/calculatePassword.ts";
import isEverySelectedOptionIncluded from "@/globals/helper/password/isEverySelectedOptionIncluded.ts";
import { ALERT_MISSING_OPTION } from "@/globals/constants/AlertMessages.ts";
import { ERROR_MESSAGE_PASSWORD_GENERATION_PREFIX } from "@/globals/constants/ErrorMessages.ts";

const usePasswordGeneration = (
  currentOptions: OptionItem[],
  characterLength: number,
): PasswordGenerationHook => {
  const generatePassword = (): string => {
    let password: string = "";
    try {
      const availableCharacters: string =
        getAvailableCharacters(currentOptions);

      if (!availableCharacters) {
        alert(ALERT_MISSING_OPTION);
        return "";
      }

      let passwordHasAllOptions: boolean = false;
      while (!passwordHasAllOptions) {
        password = calculatePassword(availableCharacters, characterLength);
        if (isEverySelectedOptionIncluded(password, currentOptions)) {
          passwordHasAllOptions = true;
        }
      }

      return password;
    } catch (error) {
      console.error(ERROR_MESSAGE_PASSWORD_GENERATION_PREFIX, error);
    }
    return password;
  };

  return { generatePassword };
};

export default usePasswordGeneration;
