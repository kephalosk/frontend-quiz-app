import { EMPTY_STRING } from "@/globals/constants/Constants.ts";
import {
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPERCASE_LETTERS,
} from "@/globals/constants/Characters.ts";
import calculatePassword from "@/globals/helper/password/calculatePassword.ts";
import { getErrorMessageCharacterLengthLess0 } from "@/globals/constants/ErrorMessages.ts";

describe("usePasswordGeneration function", (): void => {
  const availableCharacters: string = `${UPPERCASE_LETTERS}${LOWERCASE_LETTERS}${NUMBERS}${SYMBOLS}`;
  const characterLength: number = 10;

  it("calculates Password with correct length", (): void => {
    const result: string = calculatePassword(
      availableCharacters,
      characterLength,
    );

    expect(result).toHaveLength(characterLength);
  });

  it("returns empty String if no characters available", (): void => {
    const result: string = calculatePassword(EMPTY_STRING, characterLength);

    expect(result).toEqual(EMPTY_STRING);
  });

  it("throws error if characterLength is 0", (): void => {
    const characterLength0: number = 0;

    expect(() =>
      calculatePassword(availableCharacters, characterLength0),
    ).toThrow(new Error(getErrorMessageCharacterLengthLess0(characterLength0)));
  });

  it("throws error if characterLength is less 0", (): void => {
    const characterLengthLess0: number = -10;

    expect(() =>
      calculatePassword(availableCharacters, characterLengthLess0),
    ).toThrow(
      new Error(getErrorMessageCharacterLengthLess0(characterLengthLess0)),
    );
  });
});
