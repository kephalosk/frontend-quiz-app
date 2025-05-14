import darkModeReducer, {
  DarkModeState,
  setDarkModeValue,
} from "@/redux/slices/darkModeSlice.ts";

describe("characterLengthSlice", (): void => {
  const initialState: { value: boolean } = {
    value: false,
  };

  it("returns the initial state", (): void => {
    expect(darkModeReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handles setting the darkMode value", (): void => {
    const newValue: boolean = true;
    const action: {
      payload: boolean;
      type: "darkMode/setDarkModeValue";
    } = setDarkModeValue(newValue);
    const nextState: DarkModeState = darkModeReducer(initialState, action);

    expect(nextState.value).toEqual(newValue);
  });

  it("handles updating the characterLength value multiple times", (): void => {
    const action1: {
      payload: boolean;
      type: "darkMode/setDarkModeValue";
    } = setDarkModeValue(true);
    const state1: DarkModeState = darkModeReducer(initialState, action1);
    const action2: {
      payload: boolean;
      type: "darkMode/setDarkModeValue";
    } = setDarkModeValue(false);
    const state2: DarkModeState = darkModeReducer(state1, action2);

    expect(state1.value).toEqual(true);
    expect(state2.value).toEqual(false);
  });
});
