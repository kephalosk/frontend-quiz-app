import { RootState } from "@/redux/store.ts";
import { DarkModeState } from "@/redux/slices/darkModeSlice.ts";
import { TopicState } from "@/redux/slices/topicSlice.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";

export const darkModeStateMock: DarkModeState = {
  value: true,
};

export const topicStateMock: TopicState = {
  topic: null,
  questions: [],
  currentIndex: 0,
  currentScore: 0,
  isQuizFinished: false,
  status: LoadingStateEnum.IDLE,
  error: null,
};

export const stateMock: RootState = {
  darkMode: darkModeStateMock,
  topic: topicStateMock,
};
