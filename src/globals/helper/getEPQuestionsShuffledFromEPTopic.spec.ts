import { EPTopic } from "@/globals/models/entrypoints/EPTopic";
import shuffleArray from "@/globals/utils/shuffleArray";
import getEPQuestionsShuffledFromEPTopic from "@/globals/helper/getEPQuestionsShuffledFromEPTopic.ts";

jest.mock(
  "@/globals/utils/shuffleArray",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("getEPQuestionsShuffledFromEPTopic", () => {
  beforeEach(() => {
    (shuffleArray as jest.Mock).mockImplementation((arr) => [...arr].reverse());
  });

  it("shuffles both questions and options", () => {
    const mockEPTopic: EPTopic = {
      title: "Test Topic",
      icon: "test-icon",
      questions: [
        { question: "test1", options: ["1", "2", "3"], answer: "test" },
        { question: "test2", options: ["4", "5", "6"], answer: "test" },
      ],
    } as EPTopic;

    const result = getEPQuestionsShuffledFromEPTopic(mockEPTopic);

    expect(shuffleArray).toHaveBeenCalledTimes(3);
    expect(result).toHaveLength(2);
    expect(result[0].options).not.toEqual(mockEPTopic.questions[0].options);
    expect(result[1].options).not.toEqual(mockEPTopic.questions[1].options);
  });

  it("maintains question structure while shuffling", () => {
    const mockEPTopic: EPTopic = {
      title: "Test Topic",
      icon: "test-icon",
      questions: [{ question: "test", options: ["1", "2"], answer: "test" }],
    };

    const result = getEPQuestionsShuffledFromEPTopic(mockEPTopic);

    expect(result[0]).toHaveProperty("question");
    expect(result[0]).toHaveProperty("options");
    expect(Array.isArray(result[0].options)).toBeTruthy();
    expect(result[0]).toHaveProperty("answer");
  });
});
