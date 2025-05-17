import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./slices/darkModeSlice.ts";
import topicReducer from "./slices/topicSlice.ts";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    topic: topicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
