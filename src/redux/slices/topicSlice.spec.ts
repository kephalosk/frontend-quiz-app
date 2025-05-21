import topicReducer, {
  increaseScore,
  resetTopic,
  setQuizError,
  setQuestionsAndResetIndexAndScore,
  setQuizStatus,
  setTopic,
  TopicState,
  increaseIndex,
} from "@/redux/slices/topicSlice.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import {
  MAX_SCORE_ERROR_MESSAGE,
  QUESTIONS_ARE_MISSING_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from "@/globals/constants/ErrorMessages.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";

describe("topicSlice", (): void => {
  const initialState: TopicState = {
    topic: null,
    questions: [],
    currentIndex: 0,
    currentScore: 0,
    isQuizFinished: false,
    quizStatus: LoadingStateEnum.IDLE,
    quizError: null,
  };

  it("returns the initial state", (): void => {
    expect(topicReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handles setting the topic", (): void => {
    const newValue: TopicEnum = TopicEnum.HTML;
    const action: {
      payload: TopicEnum;
      type: "topic/setTopic";
    } = setTopic(newValue);
    const nextState: TopicState = topicReducer(initialState, action);

    expect(nextState.topic).toEqual(newValue);
  });

  it("handles setting the status", (): void => {
    const newValue: LoadingStateEnum = LoadingStateEnum.LOADING;
    const action: {
      payload: LoadingStateEnum;
      type: "topic/setQuizStatus";
    } = setQuizStatus(newValue);
    const nextState: TopicState = topicReducer(initialState, action);

    expect(nextState.quizStatus).toEqual(newValue);
  });

  describe("setQuestionsAndResetIndexAndScore", (): void => {
    it("sets error and status and returns early for empty Payload", (): void => {
      const newValue: EPQuestion[] = [];
      const action: {
        payload: EPQuestion[];
        type: "topic/setQuestionsAndResetIndexAndScore";
      } = setQuestionsAndResetIndexAndScore(newValue);
      const nextState: TopicState = topicReducer(initialState, action);

      expect(JSON.stringify(nextState.questions)).toEqual(
        JSON.stringify(newValue),
      );
      expect(nextState.quizError).toEqual(QUESTIONS_ARE_MISSING_ERROR_MESSAGE);
      expect(nextState.quizStatus).toEqual(LoadingStateEnum.FAILED);
    });

    it("sets questions, index, score, isQuizFinished, error and status", (): void => {
      const newValue: EPQuestion[] = [
        {
          question: "test",
          options: ["option1", "option2"],
          answer: "option1",
        },
      ];
      const action: {
        payload: EPQuestion[];
        type: "topic/setQuestionsAndResetIndexAndScore";
      } = setQuestionsAndResetIndexAndScore(newValue);
      const nextState: TopicState = topicReducer(initialState, action);

      expect(JSON.stringify(nextState.questions)).toEqual(
        JSON.stringify(newValue),
      );
      expect(nextState.currentIndex).toEqual(0);
      expect(nextState.currentScore).toEqual(0);
      expect(nextState.isQuizFinished).toEqual(false);
      expect(nextState.quizError).toEqual(null);
      expect(nextState.quizStatus).toEqual(LoadingStateEnum.SUCCEEDED);
    });
  });

  describe("increaseIndex", (): void => {
    it("sets error, currentIndex and isQuizFinished and returns early for empty questions", (): void => {
      const action: {
        payload: undefined;
        type: "topic/increaseIndex";
      } = increaseIndex();
      const nextState: TopicState = topicReducer(
        { ...initialState, questions: [] },
        action,
      );

      expect(JSON.stringify(nextState.questions)).toEqual(JSON.stringify([]));
      expect(nextState.quizError).toEqual(QUESTIONS_ARE_MISSING_ERROR_MESSAGE);
      expect(nextState.currentIndex).toEqual(0);
      expect(nextState.isQuizFinished).toEqual(true);
    });

    it("increases index", (): void => {
      const prevIndex: number = mockedQuestions.length - 2;
      const action: {
        payload: undefined;
        type: "topic/increaseIndex";
      } = increaseIndex();
      const nextState: TopicState = topicReducer(
        {
          ...initialState,
          questions: mockedQuestions,
          currentIndex: prevIndex,
        },
        action,
      );

      expect(nextState.currentIndex).toEqual(prevIndex + 1);
    });

    it("sets isQuizFinished if index reached last question", (): void => {
      const prevIndex: number = mockedQuestions.length - 1;
      const action: {
        payload: undefined;
        type: "topic/increaseIndex";
      } = increaseIndex();
      const nextState: TopicState = topicReducer(
        {
          ...initialState,
          questions: mockedQuestions,
          currentIndex: prevIndex,
        },
        action,
      );

      expect(nextState.isQuizFinished).toEqual(true);
    });
  });

  describe("increaseScore", (): void => {
    it("increases currentScore", (): void => {
      const prevScore: number = 1;
      const prevIndex: number = 1;
      const action: {
        payload: undefined;
        type: "topic/increaseScore";
      } = increaseScore();
      const nextState: TopicState = topicReducer(
        {
          ...initialState,
          questions: mockedQuestions,
          currentScore: prevScore,
          currentIndex: prevIndex,
        },
        action,
      );

      expect(JSON.stringify(nextState.questions)).toEqual(
        JSON.stringify(mockedQuestions),
      );
      expect(nextState.currentScore).toEqual(prevScore + 1);
      expect(nextState.isQuizFinished).toEqual(false);
    });

    it("sets error if currentScore has exceeded question length", (): void => {
      const prevScore: number = mockedQuestions.length + 1;
      const action: {
        payload: undefined;
        type: "topic/increaseScore";
      } = increaseScore();
      const nextState: TopicState = topicReducer(
        {
          ...initialState,
          questions: mockedQuestions,
          currentScore: prevScore,
        },
        action,
      );

      expect(nextState.quizError).toEqual(MAX_SCORE_ERROR_MESSAGE);
    });
  });

  it("sets Error", (): void => {
    const newValue: string = "test error";
    const action: {
      payload: string | null;
      type: "topic/setQuizError";
    } = setQuizError(newValue);
    const nextState: TopicState = topicReducer(initialState, action);

    expect(nextState.quizError).toEqual(newValue);
  });

  it("handles resetting everything", (): void => {
    const action: {
      payload: undefined;
      type: "topic/resetTopic";
    } = resetTopic();
    const nextState: TopicState = topicReducer(
      {
        ...initialState,
        topic: TopicEnum.HTML,
        questions: mockedQuestions,
        currentIndex: mockedQuestions.length - 1,
        currentScore: mockedQuestions.length - 1,
        isQuizFinished: true,
        quizStatus: LoadingStateEnum.SUCCEEDED,
        quizError: UNKNOWN_ERROR_MESSAGE,
      },
      action,
    );

    expect(nextState.topic).toBeNull();
    expect(JSON.stringify(nextState.questions)).toEqual(JSON.stringify([]));
    expect(nextState.currentIndex).toEqual(0);
    expect(nextState.currentScore).toEqual(0);
    expect(nextState.isQuizFinished).toEqual(false);
    expect(nextState.quizStatus).toEqual(LoadingStateEnum.IDLE);
    expect(nextState.quizError).toEqual(null);
  });

  it("handles updating the topic value multiple times", (): void => {
    const newValue1: TopicEnum = TopicEnum.CSS;
    const action1: {
      payload: TopicEnum;
      type: "topic/setTopic";
    } = setTopic(newValue1);
    const state1: TopicState = topicReducer(initialState, action1);
    const newValue2: TopicEnum = TopicEnum.JAVASCRIPT;
    const action2: {
      payload: TopicEnum;
      type: "topic/setTopic";
    } = setTopic(newValue2);
    const state2: TopicState = topicReducer(state1, action2);

    expect(state1.topic).toEqual(newValue1);
    expect(state2.topic).toEqual(newValue2);
  });
});
