import { configureStore } from "@reduxjs/toolkit";
import characterLengthReducer from "./slices/characterLengthSlice.ts";
import securityLevelReducer from "./slices/securityLevelSlice.ts";
import optionReducer from "./slices/optionSlice.ts";

export const store = configureStore({
  reducer: {
    characterLength: characterLengthReducer,
    securityLevel: securityLevelReducer,
    options: optionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
