import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OptionState {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const initialState: OptionState = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    setUppercaseOption: (state, action: PayloadAction<boolean>): void => {
      state.uppercase = action.payload;
    },
    setLowercaseOption: (state, action: PayloadAction<boolean>): void => {
      state.lowercase = action.payload;
    },
    setNumbersOption: (state, action: PayloadAction<boolean>): void => {
      state.numbers = action.payload;
    },
    setSymbolsOption: (state, action: PayloadAction<boolean>): void => {
      state.symbols = action.payload;
    },
  },
});

export const {
  setUppercaseOption,
  setLowercaseOption,
  setNumbersOption,
  setSymbolsOption,
} = optionSlice.actions;
export default optionSlice.reducer;
