import { RootState, store } from "./store";
import darkModeReducer from "./slices/darkModeSlice.ts";
import topicReducer from "./slices/topicSlice.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

jest.mock(
  "./slices/darkModeSlice.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn((state = { value: false }) => state),
  }),
);

jest.mock(
  "./slices/topicSlice.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(
      (
        state = {
          topic: null,
          questions: [],
          currentIndex: 0,
          currentScore: 0,
          isQuizFinished: false,
          status: "IDLE",
          error: null,
        },
      ) => state,
    ),
  }),
);

describe("Redux Store", (): void => {
  it("forwards actions to the darkMode reducer", (): void => {
    const action = { type: "darkMode/setDarkModeValue", payload: true };
    const prevDark = store.getState().darkMode;
    store.dispatch(action);
    expect(darkModeReducer).toHaveBeenCalledWith(prevDark, action);
  });

  it("forwards actions to the topic reducer", (): void => {
    const action = { type: "topic/setTopic", payload: TopicEnum.ACCESSIBILITY };
    const prevTopic = store.getState().topic;
    store.dispatch(action);
    expect(topicReducer).toHaveBeenCalledWith(prevTopic, action);
  });

  it("retains the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
