import { useMemo } from "react";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import {
  EMPTY_ERROR_LABEL_TEXT,
  EMPTY_HEADLINE_LABEL_TEXT,
  EMPTY_HEADLINE_LABEL_BOLD_TEXT,
  EMPTY_LABEL_TEXT,
  EMPTY_QUESTION_LABEL_TEXT,
  EMPTY_QUIZ_BUTTON_LABEL_TEXT,
  EMPTY_SCORE_LABEL_TEXT,
  EMPTY_SCORE_SUB_LINE_LABEL_TEXT,
  EMPTY_STRING,
  EMPTY_SUB_LINE_LABEL_TEXT,
  EMPTY_SUBMIT_BUTTON_LABEL_TEXT,
  EMPTY_TOPIC_LABEL_TEXT,
} from "@/globals/constants/Constants.ts";

const useLabelType = (
  type: LabelTypeEnum,
  text: string,
): { ariaLabel: string; renderedText: string } => {
  const ariaLabel: string = useMemo((): string => {
    switch (type) {
      case LabelTypeEnum.ERROR_LABEL:
        return text === EMPTY_STRING ? EMPTY_ERROR_LABEL_TEXT : text;
      case LabelTypeEnum.HEADLINE_LABEL:
        return text === EMPTY_STRING ? EMPTY_HEADLINE_LABEL_TEXT : text;
      case LabelTypeEnum.HEADLINE_LABEL_BOLD:
        return text === EMPTY_STRING ? EMPTY_HEADLINE_LABEL_BOLD_TEXT : text;
      case LabelTypeEnum.QUESTION_LABEL:
        return text === EMPTY_STRING ? EMPTY_QUESTION_LABEL_TEXT : text;
      case LabelTypeEnum.QUIZ_BUTTON_LABEL:
        return text === EMPTY_STRING ? EMPTY_QUIZ_BUTTON_LABEL_TEXT : text;
      case LabelTypeEnum.SCORE_LABEL:
        return text === EMPTY_STRING ? EMPTY_SCORE_LABEL_TEXT : text;
      case LabelTypeEnum.SCORE_SUB_LINE_LABEL:
        return text === EMPTY_STRING ? EMPTY_SCORE_SUB_LINE_LABEL_TEXT : text;
      case LabelTypeEnum.SUB_LINE_LABEL:
        return text === EMPTY_STRING ? EMPTY_SUB_LINE_LABEL_TEXT : text;
      case LabelTypeEnum.SUBMIT_BUTTON_LABEL:
        return text === EMPTY_STRING ? EMPTY_SUBMIT_BUTTON_LABEL_TEXT : text;
      case LabelTypeEnum.TOPIC_LABEL:
        return text === EMPTY_STRING ? EMPTY_TOPIC_LABEL_TEXT : text;
      default:
        return text === EMPTY_STRING ? EMPTY_LABEL_TEXT : text;
    }
  }, [text, type]);

  const renderedText: string = useMemo((): string => {
    return text;
  }, [text]);

  return { ariaLabel, renderedText };
};

export default useLabelType;
