import data from "./data.json";
import { APITopicDTO } from "@/globals/models/api/APITopicDTO.ts";
import { EPTopic } from "@/globals/models/entrypoints/EPTopic.ts";
import { MISSING_TOPIC_DATA_ERROR_MESSAGE_PREFIX } from "@/globals/constants/ErrorMessages.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { APIQuestionDTO } from "@/globals/models/api/APIQuestionDTO.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";

export async function getTopic(topic: TopicEnum): Promise<EPTopic> {
  const { quizzes }: { quizzes: APITopicDTO[] } = data;
  const demandedQuiz: APITopicDTO | undefined = quizzes.find(
    (quiz: APITopicDTO): boolean => quiz.title === topic,
  );

  if (demandedQuiz) {
    return fromAPITopicDTOMapper(demandedQuiz);
  }

  throw new Error(`${MISSING_TOPIC_DATA_ERROR_MESSAGE_PREFIX}${topic}`);
}

function fromAPITopicDTOMapper(topicDTO: APITopicDTO): EPTopic {
  return {
    title: topicDTO.title,
    icon: topicDTO.icon,
    questions: topicDTO.questions.map(
      (question: APIQuestionDTO): EPQuestion => {
        return fromAPIQuestionDTOMapper(question);
      },
    ),
  };
}

function fromAPIQuestionDTOMapper(questionDTO: APIQuestionDTO): EPQuestion {
  return {
    question: questionDTO.question,
    options: questionDTO.options,
    answer: questionDTO.answer,
  };
}
