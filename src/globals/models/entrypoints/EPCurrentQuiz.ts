import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";

export interface EPQuiz {
  topic: TopicEnum;
  questions: EPQuestion[];
}
