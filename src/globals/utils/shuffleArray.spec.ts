import shuffleArray from "@/globals/utils/shuffleArray.ts";
import { TopicItem, TopicItems } from "@/globals/constants/TopicItems.ts";

describe("shuffleArray", (): void => {
  it("returns shuffled array", (): void => {
    const input: Array<number> = [1, 2, 3, 4];

    const output: Array<number> = shuffleArray<number>(input);

    expect(output).not.toEqual(input);
  });

  it("keeps all elements", (): void => {
    const input: Array<number> = [1, 2, 3, 4];

    const output: Array<number> = shuffleArray<number>(input);

    expect(output).toHaveLength(input.length);
    expect(output.sort()).toEqual(input.sort());
  });

  it("shuffles complex objects", (): void => {
    const input: Array<TopicItem> = [
      TopicItems.at(0)!,
      TopicItems.at(1)!,
      TopicItems.at(2)!,
      TopicItems.at(3)!,
    ];

    const output: Array<TopicItem> = shuffleArray<TopicItem>(input);

    expect(output).not.toEqual(input);
  });
});
