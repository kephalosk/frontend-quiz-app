import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CHARACTER_LENGTH_INIT_VALUE,
  CHARACTER_LENGTH_MAX_VALUE,
} from "@/globals/config.ts";

export interface CharacterLengthState {
  value: number;
}

const initialState: CharacterLengthState = {
  value: CHARACTER_LENGTH_INIT_VALUE,
};

const characterLengthSlice = createSlice({
  name: "characterLength",
  initialState,
  reducers: {
    setCharacterLengthValue: (state, action: PayloadAction<number>): void => {
      if (action.payload > CHARACTER_LENGTH_MAX_VALUE) {
        state.value = CHARACTER_LENGTH_MAX_VALUE;
        return;
      }
      state.value = action.payload;
    },
  },
});

export const { setCharacterLengthValue } = characterLengthSlice.actions;
export default characterLengthSlice.reducer;
