import React, { ReactElement } from "react";
import useSettingOption from "@/hooks/redux/options/useSettingOption.ts";
import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import { fireEvent, render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import {
  setLowercaseOption,
  setNumbersOption,
  setSymbolsOption,
  setUppercaseOption,
} from "@/redux/slices/optionSlice.ts";
import { OptionKeyEnum } from "@/globals/models/enums/OptionKeyEnum.ts";

jest.mock("react-redux", (): { useDispatch: jest.Mock } => ({
  useDispatch: jest.fn(),
}));

jest.mock(
  "@/redux/slices/optionSlice.ts",
  (): {
    setUppercaseOption: jest.Mock;
    setLowercaseOption: jest.Mock;
    setNumbersOption: jest.Mock;
    setSymbolsOption: jest.Mock;
  } => ({
    setUppercaseOption: jest.fn(),
    setLowercaseOption: jest.fn(),
    setNumbersOption: jest.fn(),
    setSymbolsOption: jest.fn(),
  }),
);

const TestComponent: React.FC = (): ReactElement => {
  const { settingOption } = useSettingOption();
  return (
    <>
      {OptionItems.map((option: OptionItem, index: number) => (
        <div
          key={index}
          className={option.key}
          onClick={() => settingOption(option)}
        ></div>
      ))}
    </>
  );
};

describe("useSettingOption hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const dispatchMock: jest.Mock = jest.fn();
  const setUppercaseOptionMock: jest.Mock = jest.fn();
  const setLowercaseOptionMock: jest.Mock = jest.fn();
  const setNumbersOptionMock: jest.Mock = jest.fn();
  const setSymbolsOptionMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (setUppercaseOption as unknown as jest.Mock).mockReturnValue(
      setUppercaseOptionMock,
    );
    (setLowercaseOption as unknown as jest.Mock).mockReturnValue(
      setLowercaseOptionMock,
    );
    (setNumbersOption as unknown as jest.Mock).mockReturnValue(
      setNumbersOptionMock,
    );
    (setSymbolsOption as unknown as jest.Mock).mockReturnValue(
      setSymbolsOptionMock,
    );
  });

  it.each([
    [OptionKeyEnum.UPPERCASE_LETTERS, setUppercaseOptionMock],
    [OptionKeyEnum.LOWERCASE_LETTERS, setLowercaseOptionMock],
    [OptionKeyEnum.NUMBERS, setNumbersOptionMock],
    [OptionKeyEnum.SYMBOLS, setSymbolsOptionMock],
  ])(
    "sets the %s option",
    (key: OptionKeyEnum, optionMock: jest.Mock): void => {
      const { container } = setup();

      const element: HTMLElement | null = container.querySelector(`.${key}`);
      fireEvent.click(element!);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(optionMock);
    },
  );
});
