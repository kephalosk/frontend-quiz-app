import characterLengthReducer, {
  CharacterLengthState,
  setCharacterLengthValue,
} from "./characterLengthSlice.ts";
import {
  CHARACTER_LENGTH_INIT_VALUE,
  CHARACTER_LENGTH_MAX_VALUE,
} from "@/globals/config.ts";

describe("characterLengthSlice", (): void => {
  const initialState: { value: number } = {
    value: CHARACTER_LENGTH_INIT_VALUE,
  };

  it("returns the initial state", (): void => {
    expect(characterLengthReducer(undefined, { type: "" })).toEqual(
      initialState,
    );
  });

  it("handles setting the characterLength value", (): void => {
    const newValue: number = 10;
    const action: {
      payload: number;
      type: "characterLength/setCharacterLengthValue";
    } = setCharacterLengthValue(newValue);
    const nextState: CharacterLengthState = characterLengthReducer(
      initialState,
      action,
    );

    expect(nextState.value).toEqual(newValue);
  });

  it("handles setting the characterLength value if payload exceeds max value", (): void => {
    const newValue: number = 100;
    const action: {
      payload: number;
      type: "characterLength/setCharacterLengthValue";
    } = setCharacterLengthValue(newValue);
    const nextState: CharacterLengthState = characterLengthReducer(
      initialState,
      action,
    );

    expect(nextState.value).toEqual(CHARACTER_LENGTH_MAX_VALUE);
  });

  it("handles updating the characterLength value multiple times", (): void => {
    const action1: {
      payload: number;
      type: "characterLength/setCharacterLengthValue";
    } = setCharacterLengthValue(20);
    const state1: CharacterLengthState = characterLengthReducer(
      initialState,
      action1,
    );
    const action2: {
      payload: number;
      type: "characterLength/setCharacterLengthValue";
    } = setCharacterLengthValue(30);
    const state2: CharacterLengthState = characterLengthReducer(
      state1,
      action2,
    );

    expect(state1.value).toEqual(20);
    expect(state2.value).toEqual(30);
  });
});
