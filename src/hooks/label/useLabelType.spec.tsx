import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import {
  EMPTY_ERROR_LABEL_TEXT,
  EMPTY_HEADLINE_LABEL_TEXT,
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
import React, { ReactElement } from "react";
import useLabelType from "@/hooks/label/useLabelType.ts";
import { render, screen } from "@testing-library/react";

describe("useLabelType hook", (): void => {
  const type: LabelTypeEnum = LabelTypeEnum.HEADLINE_LABEL;
  const textDefined: string = "test";

  interface testProps {
    type: LabelTypeEnum;
    text: string;
  }

  const testId: string = "test-id";
  const setup = (
    propsOverride?: Partial<testProps>,
  ): { container: HTMLElement } => {
    const defaultProps: testProps = {
      type,
      text: textDefined,
    };

    const props: testProps = {
      ...defaultProps,
      ...propsOverride,
    };
    const TestComponent: React.FC<testProps> = ({
      type,
      text,
    }: testProps): ReactElement => {
      const { ariaLabel, renderedText } = useLabelType(type, text);
      return (
        <label data-testid={testId} aria-label={ariaLabel}>
          {renderedText}
        </label>
      );
    };

    return render(<TestComponent {...props} />);
  };

  it.each([
    [LabelTypeEnum.HEADLINE_LABEL, textDefined],
    [LabelTypeEnum.SUB_LINE_LABEL, textDefined],
    [LabelTypeEnum.QUIZ_BUTTON_LABEL, textDefined],
    [LabelTypeEnum.SUBMIT_BUTTON_LABEL, textDefined],
    [LabelTypeEnum.TOPIC_LABEL, textDefined],
    [LabelTypeEnum.QUESTION_LABEL, textDefined],
    [LabelTypeEnum.ERROR_LABEL, textDefined],
    [LabelTypeEnum.SCORE_LABEL, textDefined],
    [LabelTypeEnum.SCORE_SUB_LINE_LABEL, textDefined],
    ["undefined" as LabelTypeEnum, textDefined],
  ])(
    "returns text to render and aria-label for labelType %s for defined text",
    (type: LabelTypeEnum, text: string): void => {
      setup({ type, text: textDefined });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveTextContent(text);
      expect(element).toHaveAttribute("aria-label", text);
    },
  );

  it.each([
    [LabelTypeEnum.HEADLINE_LABEL, EMPTY_STRING, EMPTY_HEADLINE_LABEL_TEXT],
    [LabelTypeEnum.SUB_LINE_LABEL, EMPTY_STRING, EMPTY_SUB_LINE_LABEL_TEXT],
    [
      LabelTypeEnum.QUIZ_BUTTON_LABEL,
      EMPTY_STRING,
      EMPTY_QUIZ_BUTTON_LABEL_TEXT,
    ],
    [
      LabelTypeEnum.SUBMIT_BUTTON_LABEL,
      EMPTY_STRING,
      EMPTY_SUBMIT_BUTTON_LABEL_TEXT,
    ],
    [LabelTypeEnum.TOPIC_LABEL, EMPTY_STRING, EMPTY_TOPIC_LABEL_TEXT],
    [LabelTypeEnum.QUESTION_LABEL, EMPTY_STRING, EMPTY_QUESTION_LABEL_TEXT],
    [LabelTypeEnum.ERROR_LABEL, EMPTY_STRING, EMPTY_ERROR_LABEL_TEXT],
    [LabelTypeEnum.SCORE_LABEL, EMPTY_STRING, EMPTY_SCORE_LABEL_TEXT],
    [
      LabelTypeEnum.SCORE_SUB_LINE_LABEL,
      EMPTY_STRING,
      EMPTY_SCORE_SUB_LINE_LABEL_TEXT,
    ],
    ["undefined" as LabelTypeEnum, EMPTY_STRING, EMPTY_LABEL_TEXT],
  ])(
    "returns default aria-label for labelType %s for empty text %s",
    (type: LabelTypeEnum, emptyText: string, defaultLabel: string): void => {
      setup({ type, text: emptyText });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveAttribute("aria-label", defaultLabel);
    },
  );
});
