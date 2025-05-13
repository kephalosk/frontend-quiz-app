import optionReducer, {
  OptionState,
  setLowercaseOption,
  setNumbersOption,
  setSymbolsOption,
  setUppercaseOption,
} from "./optionSlice.ts";

describe("optionSlice", (): void => {
  const initialState: OptionState = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  };

  it("returns the initial state", (): void => {
    expect(optionReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it.each([
    ["setUppercaseOption", "uppercase"],
    ["setLowercaseOption", "lowercase"],
    ["setNumbersOption", "numbers"],
    ["setSymbolsOption", "symbols"],
  ] as const)(
    "handles setting the option lowercase",
    (actionName: string, stateField: keyof OptionState): void => {
      const createActionType = (actionName: string) => `option/${actionName}`;
      const newValue: boolean = true;
      const action: {
        payload: boolean;
        type: string;
      } = {
        payload: newValue,
        type: createActionType(actionName),
      };
      const nextState: OptionState = optionReducer(initialState, action);

      expect(nextState[stateField]).toEqual(newValue);
    },
  );

  it("handles updating the securityLevel value multiple times", (): void => {
    const action1: {
      payload: boolean;
      type: "option/setUppercaseOption";
    } = setUppercaseOption(true);
    const state1: OptionState = optionReducer(initialState, action1);
    const action2: {
      payload: boolean;
      type: "option/setLowercaseOption";
    } = setLowercaseOption(true);
    const state2: OptionState = optionReducer(initialState, action2);
    const action3: {
      payload: boolean;
      type: "option/setNumbersOption";
    } = setNumbersOption(true);
    const state3: OptionState = optionReducer(initialState, action3);
    const action4: {
      payload: boolean;
      type: "option/setSymbolsOption";
    } = setSymbolsOption(true);
    const state4: OptionState = optionReducer(initialState, action4);

    expect(state1.uppercase).toEqual(true);
    expect(state2.lowercase).toEqual(true);
    expect(state3.numbers).toEqual(true);
    expect(state4.symbols).toEqual(true);
  });
});
