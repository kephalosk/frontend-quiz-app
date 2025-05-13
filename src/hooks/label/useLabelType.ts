import { useMemo } from "react";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import {
  EMPTY_CHECKBOX_LABEL_TEXT,
  EMPTY_HEADER_LABEL_TEXT,
  EMPTY_UPPERCASE_LABEL_TEXT,
  EMPTY_LABEL_TEXT,
  EMPTY_PASSWORD_LABEL_TEXT,
  EMPTY_NUMBER_LABEL_TEXT,
  EMPTY_STRING,
  PASSWORD_PLACEHOLDER_LABEL_TEXT,
  ZERO_LABEL_TEXT,
  EMPTY_STRENGTH_BEAM_LABEL_TEXT,
  EMPTY_COPY_LABEL_TEXT,
} from "@/globals/constants/Constants.ts";

const useLabelType = (
  type: LabelTypeEnum,
  text: string,
): { ariaLabel: string; renderedText: string } => {
  const ariaLabel: string = useMemo((): string => {
    switch (type) {
      case LabelTypeEnum.LABEL:
        return text === EMPTY_STRING ? EMPTY_LABEL_TEXT : text;
      case LabelTypeEnum.PASSWORD_LABEL:
        return text === EMPTY_STRING ? EMPTY_PASSWORD_LABEL_TEXT : text;
      case LabelTypeEnum.HEADER_LABEL:
        return text === EMPTY_STRING ? EMPTY_HEADER_LABEL_TEXT : text;
      case LabelTypeEnum.NUMBER_LABEL:
        return text === EMPTY_STRING ? EMPTY_NUMBER_LABEL_TEXT : text;
      case LabelTypeEnum.CHECKBOX_LABEL:
        return text === EMPTY_STRING ? EMPTY_CHECKBOX_LABEL_TEXT : text;
      case LabelTypeEnum.UPPERCASE_LABEL:
        return text === EMPTY_STRING ? EMPTY_UPPERCASE_LABEL_TEXT : text;
      case LabelTypeEnum.BEAM_LABEL:
        return text === EMPTY_STRING ? EMPTY_STRENGTH_BEAM_LABEL_TEXT : text;
      case LabelTypeEnum.COPY_LABEL:
        return text === EMPTY_STRING ? EMPTY_COPY_LABEL_TEXT : text;
      default:
        return text === EMPTY_STRING ? EMPTY_LABEL_TEXT : text;
    }
  }, [text, type]);

  const renderedText: string = useMemo((): string => {
    switch (type) {
      case LabelTypeEnum.LABEL:
        return text;
      case LabelTypeEnum.PASSWORD_LABEL:
        return text === EMPTY_STRING ? PASSWORD_PLACEHOLDER_LABEL_TEXT : text;
      case LabelTypeEnum.HEADER_LABEL:
        return text;
      case LabelTypeEnum.NUMBER_LABEL:
        return text === EMPTY_STRING ? ZERO_LABEL_TEXT : text;
      case LabelTypeEnum.CHECKBOX_LABEL:
        return text;
      case LabelTypeEnum.UPPERCASE_LABEL:
        return text;
      case LabelTypeEnum.BEAM_LABEL:
        return text;
      case LabelTypeEnum.COPY_LABEL:
        return text;
      default:
        return text;
    }
  }, [text, type]);

  return { ariaLabel, renderedText };
};

export default useLabelType;
