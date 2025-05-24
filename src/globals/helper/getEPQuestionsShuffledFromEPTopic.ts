import shuffleArray from "@/globals/utils/shuffleArray.ts";
import { EPTopic } from "@/globals/models/entrypoints/EPTopic.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";

const getEPQuestionsShuffledFromEPTopic = (epTopic: EPTopic): EPQuestion[] => {
  const epQuestionsOptionsShuffled = epTopic.questions.map((question) => {
    return { ...question, options: shuffleArray(question.options) };
  });
  return shuffleArray(epQuestionsOptionsShuffled);
};

export default getEPQuestionsShuffledFromEPTopic;
