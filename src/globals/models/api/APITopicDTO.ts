import { APIQuestionDTO } from "@/globals/models/api/APIQuestionDTO.ts";

export interface APITopicDTO {
  title: string;
  icon: string;
  questions: APIQuestionDTO[];
}
