import { RootState } from "@/redux/store.ts";
import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { OptionEnum } from "@/globals/models/enums/OptionEnum.ts";
import { CurentOptionsHook } from "@/globals/models/types/CurrentOptionsTypes.ts";

export const selectUppercaseValue = (state: RootState) =>
  state.options.uppercase;
export const selectLowercaseValue = (state: RootState) =>
  state.options.lowercase;
export const selectNumbersValue = (state: RootState) => state.options.numbers;
export const selectSymbolsValue = (state: RootState) => state.options.symbols;

const useCurrentOptions = (): CurentOptionsHook => {
  const currentOptions: OptionItem[] = useMemo(() => {
    return [...OptionItems];
  }, []);

  const isUppercase: boolean = useSelector(selectUppercaseValue);
  const isLowercase: boolean = useSelector(selectLowercaseValue);
  const isNumbers: boolean = useSelector(selectNumbersValue);
  const isSymbols: boolean = useSelector(selectSymbolsValue);

  const setOptionItemValue = useCallback(
    (option: OptionEnum, value: boolean): void => {
      const item: OptionItem | undefined = currentOptions.find(
        (item: OptionItem): boolean => item.option === option,
      );
      if (item) {
        item.isChecked = value;
      }
    },
    [currentOptions],
  );

  setOptionItemValue(OptionEnum.UPPERCASE_LETTERS, isUppercase);
  setOptionItemValue(OptionEnum.LOWERCASE_LETTERS, isLowercase);
  setOptionItemValue(OptionEnum.NUMBERS, isNumbers);
  setOptionItemValue(OptionEnum.SYMBOLS, isSymbols);

  return { currentOptions };
};

export default useCurrentOptions;
