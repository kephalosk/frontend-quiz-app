import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import {
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPERCASE_LETTERS,
} from "@/globals/constants/Characters.ts";
import isEverySelectedOptionIncluded from "@/globals/helper/password/isEverySelectedOptionIncluded.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";
import { ERROR_MESSAGE_MISSING_OPTION } from "@/globals/constants/ErrorMessages.ts";

describe("isEverySelectedOptionIncluded function", (): void => {
  const currentOptionsAllSelection: OptionItem[] = OptionItems.map(
    (option: OptionItem): OptionItem => {
      return { ...option, isChecked: true };
    },
  );

  it("returns true if every selected option is included", (): void => {
    const passwordWithEveryOption: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}${SYMBOLS.at(0)}`;

    const result: boolean = isEverySelectedOptionIncluded(
      passwordWithEveryOption,
      currentOptionsAllSelection,
    );

    expect(result).toBe(true);
  });

  it("returns false if password is empty", (): void => {
    const result: boolean = isEverySelectedOptionIncluded(
      EMPTY_STRING,
      currentOptionsAllSelection,
    );

    expect(result).toBe(false);
  });

  it("returns false if an Option is missing", (): void => {
    const passwordWithMissingOption: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}`;

    const result: boolean = isEverySelectedOptionIncluded(
      passwordWithMissingOption,
      currentOptionsAllSelection,
    );

    expect(result).toBe(false);
  });

  it("throws if options are missing", (): void => {
    const passwordWithEveryOption: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}${SYMBOLS.at(0)}`;

    expect(() =>
      isEverySelectedOptionIncluded(passwordWithEveryOption, []),
    ).toThrow(new Error(ERROR_MESSAGE_MISSING_OPTION));
  });
});
