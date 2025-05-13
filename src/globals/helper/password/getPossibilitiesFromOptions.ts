import {
  OptionItems,
  optionToCharacters,
} from "@/globals/constants/OptionItems.ts";

const getPossibilitiesFromOptions = (password: string): bigint => {
  if (!password) {
    return 0n;
  }

  const possibilitiesPerCharacter: number =
    getNumberOfPossibilitiesPerCharacter(password);

  return getNumberOfPossibilitiesPerPassword(
    possibilitiesPerCharacter,
    password,
  );
};

const getNumberOfPossibilitiesPerPassword = (
  possibilitiesPerCharacter: number,
  password: string,
): bigint => {
  const possibilitiesBigInt: bigint = BigInt(possibilitiesPerCharacter);

  let result: bigint = 1n;

  for (let i = 0; i < password.length; i++) {
    result *= possibilitiesBigInt;
  }

  return result;
};

const getNumberOfPossibilitiesPerCharacter = (password: string): number => {
  let possibilitiesPerCharacter: number = 0;
  for (const option of OptionItems) {
    const characters: string = optionToCharacters[option.option];
    if (
      characters
        .split("")
        .some((char: string): boolean => password.includes(char))
    ) {
      possibilitiesPerCharacter += option.possibilities;
    }
  }
  return possibilitiesPerCharacter;
};

export default getPossibilitiesFromOptions;
