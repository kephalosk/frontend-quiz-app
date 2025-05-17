import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

export interface TopicState {
  value: TopicEnum | undefined;
}

const initialState: TopicState = {
  value: undefined,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setTopicValue: (state, action: PayloadAction<TopicEnum>): void => {
      state.value = action.payload;
    },
    resetTopicValue: (state): void => {
      state.value = undefined;
    },
  },
});

export const { setTopicValue, resetTopicValue } = topicSlice.actions;
export default topicSlice.reducer;
