import { getErrorMessageCharacterLengthLess0 } from "@/globals/constants/ErrorMessages.ts";

const calculatePassword = (
  availableCharacters: string,
  characterLength: number,
): string => {
  if (!availableCharacters) {
    return "";
  }
  if (characterLength <= 0) {
    throw new Error(getErrorMessageCharacterLengthLess0(characterLength));
  }

  let password: string = "";
  for (let i: number = 0; i < characterLength; i++) {
    const randomIndex: number = Math.floor(
      Math.random() * availableCharacters.length,
    );
    password += availableCharacters[randomIndex];
  }
  return password;
};

export default calculatePassword;
