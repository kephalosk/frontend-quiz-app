import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { getTopic } from "@/globals/services/TopicService.ts";
import {
  AccessibilityTopicFixture,
  CSSTopicFixture,
  HTMLTopicFixture,
  JavaScriptTopicFixture,
} from "@/jest/fixtures/TopicServiceFixtures.ts";
import { EPTopic } from "@/globals/models/entrypoints/EPTopic.ts";
import { MISSING_TOPIC_DATA_ERROR_MESSAGE_PREFIX } from "@/globals/constants/ErrorMessages.ts";

describe("TopicService", (): void => {
  it.each([
    [TopicEnum.HTML, HTMLTopicFixture],
    [TopicEnum.CSS, CSSTopicFixture],
    [TopicEnum.JAVASCRIPT, JavaScriptTopicFixture],
    [TopicEnum.ACCESSIBILITY, AccessibilityTopicFixture],
  ])(
    "returns demanded topics",
    async (topic: TopicEnum, epTopic: EPTopic): Promise<void> => {
      const result: EPTopic = await getTopic(topic);

      expect(JSON.stringify(result)).toEqual(JSON.stringify(epTopic));
    },
  );

  it("throws error if topic is unknown", async (): Promise<void> => {
    const unknownTopic: TopicEnum = "unknown" as TopicEnum;

    await expect(getTopic(unknownTopic)).rejects.toThrow(
      new Error(`${MISSING_TOPIC_DATA_ERROR_MESSAGE_PREFIX}${unknownTopic}`),
    );
  });
});
