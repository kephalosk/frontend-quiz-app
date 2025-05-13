import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import getAvailableCharacters from "@/globals/helper/password/getAvailableCharacters.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";
import {
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPERCASE_LETTERS,
} from "@/globals/constants/Characters.ts";

describe("getAvailableCharacters function", (): void => {
  it("returns empty string if no option is selected", (): void => {
    const currentOptionsNoSelection: OptionItem[] = OptionItems.map(
      (option: OptionItem): OptionItem => {
        return { ...option, isChecked: false };
      },
    );

    const result: string = getAvailableCharacters(currentOptionsNoSelection);

    expect(result).toEqual(EMPTY_STRING);
  });

  it("returns string with option based characters", (): void => {
    const currentOptionsAllSelection: OptionItem[] = OptionItems.map(
      (option: OptionItem): OptionItem => {
        return { ...option, isChecked: true };
      },
    );

    const result: string = getAvailableCharacters(currentOptionsAllSelection);

    expect(result).toContain(UPPERCASE_LETTERS);
    expect(result).toContain(LOWERCASE_LETTERS);
    expect(result).toContain(NUMBERS);
    expect(result).toContain(SYMBOLS);
  });
});
