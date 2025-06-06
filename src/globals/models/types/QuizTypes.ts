import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

export type UpdateSelectionHook = {
  statusArraySelected: QuestionStatusEnum[];
  statusArrayAnswered: QuestionStatusEnum[];
  handleSelection: (
    answer: string,
    positionClicked: QuestionPositionEnum,
  ) => void;
};

export type QuizSubmitHook = {
  handleSubmit: () => void;
  updateSelectionResult: (value: boolean) => void;
  resetKey: number;
  isQuestionAnswered: boolean;
  isQuizFinished: boolean;
  hasError: boolean;
};

export type SubmitAnswerHook = { tryToSubmitAnswer: () => void };

export type ResetKeyHook = { resetKey: number; resetStatusArray: () => void };

export type UpdateSelectionResultHook = {
  updateSelectionResult: (value: boolean) => void;
};

export type AnswerSelectionHook = {
  isAnswerSelected: boolean;
  setIsAnswerSelected: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
};

export type QuestionAnsweredHook = {
  isQuestionAnswered: boolean;
  setIsQuestionAnswered: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
};

export type CurrentQuestionHook = {
  currentQuestionText: string;
  progressInfo: string;
  progressPerCent: number;
};

export type QuizStartHook = {
  handleQuizStart: (topic: TopicEnum) => Promise<void>;
};
