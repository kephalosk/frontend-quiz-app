import { RootState, store } from "./store";
import { setDarkModeValue } from "@/redux/slices/darkModeSlice.ts";

describe("Redux Store", (): void => {
  it("handles setDarkModeValue correctly", (): void => {
    const darkModeState: boolean = true;
    store.dispatch(setDarkModeValue(darkModeState));

    const state: RootState = store.getState() as RootState;
    expect(state.darkMode.value).toEqual(darkModeState);
  });

  it("retains the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
