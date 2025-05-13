import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";

export interface SecurityLevelState {
  value: SecurityLevelEnum;
}

const initialState: SecurityLevelState = {
  value: SecurityLevelEnum.NONE,
};

const securityLevelSlice = createSlice({
  name: "securityLevel",
  initialState,
  reducers: {
    setSecurityLevelValue: (
      state,
      action: PayloadAction<SecurityLevelEnum>,
    ): void => {
      state.value = action.payload;
    },
  },
});

export const { setSecurityLevelValue } = securityLevelSlice.actions;
export default securityLevelSlice.reducer;
