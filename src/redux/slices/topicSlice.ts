import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";
import {
  MAX_SCORE_ERROR_MESSAGE,
  QUESTIONS_ARE_MISSING_ERROR_MESSAGE,
} from "@/globals/constants/ErrorMessages.ts";

export interface TopicState {
  topic: TopicEnum | null;
  questions: EPQuestion[];
  currentIndex: number;
  currentScore: number;
  isQuizFinished: boolean;
  status: LoadingStateEnum;
  error: string | null;
}

const initialState: TopicState = {
  topic: null,
  questions: [],
  currentIndex: 0,
  currentScore: 0,
  isQuizFinished: false,
  status: LoadingStateEnum.IDLE,
  error: null,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setTopic: (state: TopicState, action: PayloadAction<TopicEnum>): void => {
      state.topic = action.payload;
    },
    setStatus(state: TopicState, action: PayloadAction<LoadingStateEnum>) {
      state.status = action.payload;
    },
    setQuestionsAndResetIndexAndScore: (
      state: TopicState,
      action: PayloadAction<EPQuestion[]>,
    ): void => {
      if (!action.payload.length) {
        state.error = QUESTIONS_ARE_MISSING_ERROR_MESSAGE;
        state.status = LoadingStateEnum.FAILED;
        return;
      }
      state.questions = action.payload;
      state.currentIndex = 0;
      state.currentScore = 0;
      state.isQuizFinished = false;
      state.error = null;
      state.status = LoadingStateEnum.SUCCEEDED;
    },
    answerQuestion: (state, action: PayloadAction<{ correct: boolean }>) => {
      if (!state.questions.length) {
        state.error = QUESTIONS_ARE_MISSING_ERROR_MESSAGE;
        state.currentIndex = 0;
        state.isQuizFinished = true;
        return;
      }

      if (action.payload.correct) {
        if (state.currentScore > state.questions.length) {
          state.error = MAX_SCORE_ERROR_MESSAGE;
        } else {
          state.currentScore++;
        }
      }

      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
      } else {
        state.isQuizFinished = true;
      }
    },
    setError(state: TopicState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetTopic: (state: TopicState): void => {
      Object.assign(state, {
        ...initialState,
        status: LoadingStateEnum.IDLE,
        error: null,
      });
    },
  },
});

export const {
  setTopic,
  setStatus,
  setQuestionsAndResetIndexAndScore,
  answerQuestion,
  setError,
  resetTopic,
} = topicSlice.actions;

export default topicSlice.reducer;
