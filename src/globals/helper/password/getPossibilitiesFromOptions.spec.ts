import { EMPTY_STRING } from "@/globals/constants/Constants.ts";
import {
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPERCASE_LETTERS,
} from "@/globals/constants/Characters.ts";
import getPossibilitiesFromOptions from "@/globals/helper/password/getPossibilitiesFromOptions.ts";

describe("getPointsFromOptions function", (): void => {
  //Password strength for reference: https://www.hivesystems.com/blog/are-your-passwords-in-the-green
  //NONE for 0 possibility
  //WEAK from 1 possibility (ab 1 / instant hack)
  const passwordWith1Option1Character: string = `${UPPERCASE_LETTERS.at(0)}`;
  const passwordWith1Option2Characters: string = `${UPPERCASE_LETTERS.at(0)}${UPPERCASE_LETTERS.at(0)}`;
  const passwordWith1Option3Characters: string = `${UPPERCASE_LETTERS.at(0)}${UPPERCASE_LETTERS.at(0)}${UPPERCASE_LETTERS.at(0)}`;
  const passwordWith1Option4Characters: string = `${UPPERCASE_LETTERS.at(0)}${UPPERCASE_LETTERS.at(0)}${UPPERCASE_LETTERS.at(0)}${UPPERCASE_LETTERS.at(0)}`;
  const passwordWith2Options2Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}`;
  const passwordWith2Options3Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}`;
  const passwordWith2Options4Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}`;
  const passwordWith3Options3Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}`;
  const passwordWith3Options4Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}${NUMBERS.at(0)}`;
  const passwordWith4Options4Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}${SYMBOLS.at(0)}`;
  const passwordWith4Options5Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}${SYMBOLS.at(0)}5`;
  const passwordWith3Options7Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}4567`;
  //LOW from 3521614606208n possibilities (ab 3 Billionen / ungefähr 1 Jahr)
  const passwordWith1Option8Characters: string = `${LOWERCASE_LETTERS.at(0)}aaaaaaa`;
  const passwordWith2Options10Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}aaaaaaaa`;
  //MEDIUM from 144555105949057024n possibilities (ab 140 Billiarden / ungefähr 41.000 Jahre)
  const passwordWith2Options13Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}aaaaaaaaaaa`;
  //STRONG from 20325604337285010030592n possibilities (ab 20 Trilliarden / ungefähr 5.000.000.000 Jahre)
  const passwordWith1Option16Characters: string = `${NUMBERS.at(0)}234567890123456`;
  const passwordWith2Options16Characters: string = `${UPPERCASE_LETTERS.at(0)}${NUMBERS.at(0)}34567890123456`;
  const passwordWith3Options16Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}4567890123456`;
  const passwordWith4Options16Characters: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}${SYMBOLS.at(0)}567890123456`;

  it.each([
    [0n, EMPTY_STRING],
    [26n, passwordWith1Option1Character],
    [676n, passwordWith1Option2Characters],
    [2704n, passwordWith2Options2Characters],
    [17576n, passwordWith1Option3Characters],
    [140608n, passwordWith2Options3Characters],
    [238328n, passwordWith3Options3Characters],
    [456976n, passwordWith1Option4Characters],
    [7311616n, passwordWith2Options4Characters],
    [14776336n, passwordWith3Options4Characters],
    [68574961n, passwordWith4Options4Characters],
    [6240321451n, passwordWith4Options5Characters],
    [208827064576n, passwordWith1Option8Characters],
    [3521614606208n, passwordWith3Options7Characters],
    [144555105949057024n, passwordWith2Options10Characters],
    [20325604337285010030592n, passwordWith2Options13Characters],
    [10000000000000000n, passwordWith1Option16Characters],
    [7958661109946400884391936n, passwordWith2Options16Characters],
    [47672401706823533450263330816n, passwordWith3Options16Characters],
    [22113743972843938840712550613441n, passwordWith4Options16Characters],
  ])(
    "returns %s possibilities for %s passwords",
    (points: bigint, password: string): void => {
      const result: bigint = getPossibilitiesFromOptions(password);

      expect(result).toEqual(points);
    },
  );
});
