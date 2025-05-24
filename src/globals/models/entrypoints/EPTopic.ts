import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";

export interface EPTopic {
  title: string;
  icon: string;
  questions: EPQuestion[];
}
