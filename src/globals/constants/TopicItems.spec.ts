import { getTopicKey } from "@/globals/constants/TopicItems.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

describe("TopicItems", (): void => {
  it("returns key for topic", (): void => {
    const expectedKey: string = "topicwithupperlettersandwhitespace";

    const result: string = getTopicKey(
      "Topic with upper letters and whitespace" as TopicEnum,
    );

    expect(result).toEqual(expectedKey);
  });
});
