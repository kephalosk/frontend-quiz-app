import { RootState, store } from "./store";
import { setCharacterLengthValue } from "@/redux/slices/characterLengthSlice.ts";
import { CHARACTER_LENGTH_MAX_VALUE } from "@/globals/config.ts";
import { setSecurityLevelValue } from "@/redux/slices/securityLevelSlice.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import {
  setLowercaseOption,
  setNumbersOption,
  setSymbolsOption,
  setUppercaseOption,
} from "@/redux/slices/optionSlice.ts";

describe("Redux Store", (): void => {
  it("handles setCharacterLengthValue correctly", (): void => {
    store.dispatch(setCharacterLengthValue(CHARACTER_LENGTH_MAX_VALUE));

    const state: RootState = store.getState() as RootState;
    expect(state.characterLength.value).toEqual(CHARACTER_LENGTH_MAX_VALUE);
  });

  it("handles setSecurityLevelValue correctly", (): void => {
    store.dispatch(setSecurityLevelValue(SecurityLevelEnum.STRONG));

    const state: RootState = store.getState() as RootState;
    expect(state.securityLevel.value).toEqual(SecurityLevelEnum.STRONG);
  });

  it("handles setUppercaseOption correctly", (): void => {
    store.dispatch(setUppercaseOption(true));

    const state: RootState = store.getState() as RootState;
    expect(state.options.uppercase).toEqual(true);
  });

  it("handles setLowercaseOption correctly", (): void => {
    store.dispatch(setLowercaseOption(true));

    const state: RootState = store.getState() as RootState;
    expect(state.options.lowercase).toEqual(true);
  });

  it("handles setNumbersOption correctly", (): void => {
    store.dispatch(setNumbersOption(true));

    const state: RootState = store.getState() as RootState;
    expect(state.options.numbers).toEqual(true);
  });

  it("handles setSymbolsOption correctly", (): void => {
    store.dispatch(setSymbolsOption(true));

    const state: RootState = store.getState() as RootState;
    expect(state.options.symbols).toEqual(true);
  });

  it("retains the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
