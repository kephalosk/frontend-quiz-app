import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DarkModeState {
  value: boolean;
}

const initialState: DarkModeState = {
  value: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkModeValue: (
      state: DarkModeState,
      action: PayloadAction<boolean>,
    ): void => {
      state.value = action.payload;
    },
  },
});

export const { setDarkModeValue } = darkModeSlice.actions;
export default darkModeSlice.reducer;
