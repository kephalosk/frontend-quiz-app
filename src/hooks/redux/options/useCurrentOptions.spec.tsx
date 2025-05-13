import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import useCurrentOptions, {
  selectLowercaseValue,
  selectNumbersValue,
  selectSymbolsValue,
  selectUppercaseValue,
} from "@/hooks/redux/options/useCurrentOptions.ts";
import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import { ReactElement } from "react";
import { OptionKeyEnum } from "@/globals/models/enums/OptionKeyEnum.ts";

jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock;
    useSelector: jest.Mock;
  } => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }),
);

describe("useCurrentOptions Hook", (): void => {
  const uppercase: boolean = true;
  const lowercase: boolean = true;
  const numbers: boolean = true;
  const symbols: boolean = true;

  const mockState: RootState = {
    characterLength: { value: 1 },
    securityLevel: { value: SecurityLevelEnum.NONE },
    options: {
      uppercase,
      lowercase,
      numbers,
      symbols,
    },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState),
    );
  });

  const currentOptionsTestId: string = "current-options";
  const TestComponent = () => {
    const { currentOptions } = useCurrentOptions();
    return (
      <div>
        {currentOptions.map(
          (option: OptionItem, index: number): ReactElement => {
            return (
              <div
                key={index}
                data-testid={currentOptionsTestId}
                className={option.option}
              >
                {option.isChecked && "true"}
              </div>
            );
          },
        )}
      </div>
    );
  };

  it("returns currentOptions correctly", (): void => {
    render(<TestComponent />);

    const elements: HTMLElement[] = screen.getAllByTestId(currentOptionsTestId);

    expect(elements).toHaveLength(OptionItems.length);
    elements.forEach((element: HTMLElement): void => {
      expect(element).toHaveTextContent("true");
    });
  });

  it.each([
    [OptionKeyEnum.UPPERCASE_LETTERS, selectUppercaseValue],
    [OptionKeyEnum.LOWERCASE_LETTERS, selectLowercaseValue],
    [OptionKeyEnum.NUMBERS, selectNumbersValue],
    [OptionKeyEnum.SYMBOLS, selectSymbolsValue],
  ])(
    "calls store for %s value",
    (field: OptionKeyEnum, storeCall: (state: RootState) => boolean): void => {
      const expectedValue: boolean = true;
      const state: RootState = {
        ...mockState,
        options: {
          ...mockState.options,
          [field]: expectedValue,
        },
      };

      const receivedValue: boolean = storeCall(state);

      expect(receivedValue).toBe(expectedValue);
    },
  );
});
