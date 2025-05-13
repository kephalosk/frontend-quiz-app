import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import {
  EMPTY_CHECKBOX_LABEL_TEXT,
  EMPTY_UPPERCASE_LABEL_TEXT,
  EMPTY_LABEL_TEXT,
  EMPTY_NUMBER_LABEL_TEXT,
  EMPTY_STRING,
  EMPTY_PASSWORD_LABEL_TEXT,
  EMPTY_HEADER_LABEL_TEXT,
  PASSWORD_PLACEHOLDER_LABEL_TEXT,
  ZERO_LABEL_TEXT,
  EMPTY_STRENGTH_BEAM_LABEL_TEXT,
  EMPTY_COPY_LABEL_TEXT,
} from "@/globals/constants/Constants.ts";
import React, { ReactElement } from "react";
import useLabelType from "@/hooks/label/useLabelType.ts";
import { render, screen } from "@testing-library/react";

describe("useLabelType hook", (): void => {
  const type: LabelTypeEnum = LabelTypeEnum.PASSWORD_LABEL;
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
    [LabelTypeEnum.LABEL, textDefined],
    [LabelTypeEnum.PASSWORD_LABEL, textDefined],
    [LabelTypeEnum.HEADER_LABEL, textDefined],
    [LabelTypeEnum.NUMBER_LABEL, textDefined],
    [LabelTypeEnum.CHECKBOX_LABEL, textDefined],
    [LabelTypeEnum.UPPERCASE_LABEL, textDefined],
    [LabelTypeEnum.BEAM_LABEL, textDefined],
    [LabelTypeEnum.COPY_LABEL, textDefined],
    ["undefined" as LabelTypeEnum, textDefined],
  ])(
    "returns aria-label for labelType %s for defined text",
    (type: LabelTypeEnum, ariaLabel: string): void => {
      setup({ type, text: textDefined });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveAttribute("aria-label", ariaLabel);
    },
  );

  it.each([
    [LabelTypeEnum.LABEL, EMPTY_STRING, EMPTY_LABEL_TEXT],
    [LabelTypeEnum.PASSWORD_LABEL, EMPTY_STRING, EMPTY_PASSWORD_LABEL_TEXT],
    [LabelTypeEnum.HEADER_LABEL, EMPTY_STRING, EMPTY_HEADER_LABEL_TEXT],
    [LabelTypeEnum.NUMBER_LABEL, EMPTY_STRING, EMPTY_NUMBER_LABEL_TEXT],
    [LabelTypeEnum.CHECKBOX_LABEL, EMPTY_STRING, EMPTY_CHECKBOX_LABEL_TEXT],
    [LabelTypeEnum.UPPERCASE_LABEL, EMPTY_STRING, EMPTY_UPPERCASE_LABEL_TEXT],
    [LabelTypeEnum.BEAM_LABEL, EMPTY_STRING, EMPTY_STRENGTH_BEAM_LABEL_TEXT],
    [LabelTypeEnum.COPY_LABEL, EMPTY_STRING, EMPTY_COPY_LABEL_TEXT],
    ["undefined" as LabelTypeEnum, EMPTY_STRING, EMPTY_LABEL_TEXT],
  ])(
    "returns default aria-label for labelType %s for empty text %s",
    (type: LabelTypeEnum, emptyText: string, defaultLabel: string): void => {
      setup({ type, text: emptyText });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveAttribute("aria-label", defaultLabel);
    },
  );

  it.each([
    [LabelTypeEnum.LABEL, textDefined],
    [LabelTypeEnum.PASSWORD_LABEL, textDefined],
    [LabelTypeEnum.HEADER_LABEL, textDefined],
    [LabelTypeEnum.NUMBER_LABEL, textDefined],
    [LabelTypeEnum.CHECKBOX_LABEL, textDefined],
    [LabelTypeEnum.UPPERCASE_LABEL, textDefined],
    [LabelTypeEnum.BEAM_LABEL, textDefined],
    [LabelTypeEnum.COPY_LABEL, textDefined],
    ["undefined" as LabelTypeEnum, textDefined],
  ])(
    "returns text to render for labelType %s",
    (type: LabelTypeEnum, renderedText: string): void => {
      setup({ type, text: textDefined });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveTextContent(renderedText);
    },
  );

  it.each([
    [LabelTypeEnum.PASSWORD_LABEL, PASSWORD_PLACEHOLDER_LABEL_TEXT],
    [LabelTypeEnum.NUMBER_LABEL, ZERO_LABEL_TEXT],
  ])(
    "returns alternative text to render for labelType %s with empty text",
    (type: LabelTypeEnum, renderedText: string): void => {
      setup({ type, text: EMPTY_STRING });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveTextContent(renderedText);
    },
  );
});
