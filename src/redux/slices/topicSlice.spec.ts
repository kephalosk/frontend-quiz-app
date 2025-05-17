import topicReducer, {
  resetTopicValue,
  setTopicValue,
  TopicState,
} from "@/redux/slices/topicSlice.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

describe("topicSlice", (): void => {
  const initialState: { value: TopicEnum | undefined } = {
    value: undefined,
  };

  it("returns the initial state", (): void => {
    expect(topicReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handles setting the topic value", (): void => {
    const newValue: TopicEnum = TopicEnum.HTML;
    const action: {
      payload: TopicEnum;
      type: "topic/setTopicValue";
    } = setTopicValue(newValue);
    const nextState: TopicState = topicReducer(initialState, action);

    expect(nextState.value).toEqual(newValue);
  });

  it("handles resetting the topic value", (): void => {
    const action: {
      payload: undefined;
      type: "topic/resetTopicValue";
    } = resetTopicValue();
    const nextState: TopicState = topicReducer(initialState, action);

    expect(nextState.value).toBeUndefined();
  });

  it("handles updating the characterLength value multiple times", (): void => {
    const newValue1: TopicEnum = TopicEnum.CSS;
    const action1: {
      payload: TopicEnum;
      type: "topic/setTopicValue";
    } = setTopicValue(newValue1);
    const state1: TopicState = topicReducer(initialState, action1);
    const newValue2: TopicEnum = TopicEnum.JAVASCRIPT;
    const action2: {
      payload: TopicEnum;
      type: "topic/setTopicValue";
    } = setTopicValue(newValue2);
    const state2: TopicState = topicReducer(state1, action2);

    expect(state1.value).toEqual(newValue1);
    expect(state2.value).toEqual(newValue2);
  });
});
