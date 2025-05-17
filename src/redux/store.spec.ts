import { RootState, store } from "./store";
import { setDarkModeValue } from "@/redux/slices/darkModeSlice.ts";
import { resetTopicValue, setTopicValue } from "@/redux/slices/topicSlice.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

describe("Redux Store", (): void => {
  it("handles setDarkModeValue correctly", (): void => {
    const darkModeState: boolean = true;
    store.dispatch(setDarkModeValue(darkModeState));

    const state: RootState = store.getState() as RootState;
    expect(state.darkMode.value).toEqual(darkModeState);
  });

  it("handles setTopicValue correctly", (): void => {
    const topicState: TopicEnum = TopicEnum.HTML;
    store.dispatch(setTopicValue(topicState));

    const state: RootState = store.getState() as RootState;
    expect(state.topic.value).toEqual(topicState);
  });

  it("handles resetTopicValue correctly", (): void => {
    const topicState: undefined = undefined;
    store.dispatch(resetTopicValue(topicState));

    const state: RootState = store.getState() as RootState;
    expect(state.topic.value).toEqual(topicState);
  });

  it("retains the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
