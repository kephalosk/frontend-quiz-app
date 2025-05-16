import React from "react";
import { render, screen } from "@testing-library/react";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import { QuizButtonIconHook } from "@/globals/models/types/QuizButtonTypes.ts";
import useQuizButtonIcon from "@/hooks/quizButton/useQuizButtonIcon.ts";
import {
  CORRECT_ICON_SRC,
  ERROR_ICON_SRC,
} from "@/globals/constants/Ressources.ts";
import {
  CORRECT_ICON_ALT_TEXT,
  ERROR_ICON_ALT_TEXT,
} from "@/globals/constants/Constants.ts";

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{
  status: QuestionStatusEnum;
}> = ({ status }) => {
  const { showIcon, src, alt }: QuizButtonIconHook = useQuizButtonIcon(status);

  return (
    <>
      {showIcon && (
        <img data-testid={testComponentDataTestId} src={src} alt={alt} />
      )}
    </>
  );
};

describe("useQuizButtonIcon Hook", (): void => {
  const status: QuestionStatusEnum = QuestionStatusEnum.DEFAULT;

  const setup = (propsOverride?: { status: QuestionStatusEnum }): void => {
    const defaultProps: { status: QuestionStatusEnum } = {
      status,
    };
    const props: { status: QuestionStatusEnum } = {
      ...defaultProps,
      ...propsOverride,
    };
    render(<TestComponent {...props} />);
  };

  it.each([
    [QuestionStatusEnum.CORRECTED, CORRECT_ICON_SRC, CORRECT_ICON_ALT_TEXT],
    [QuestionStatusEnum.RIGHT, CORRECT_ICON_SRC, CORRECT_ICON_ALT_TEXT],
    [QuestionStatusEnum.WRONG, ERROR_ICON_SRC, ERROR_ICON_ALT_TEXT],
  ])(
    "returns icon for QuestionStatusEnum %s",
    (status: QuestionStatusEnum, src: string, alt: string): void => {
      setup({
        status,
      });

      const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("src", src);
      expect(element).toHaveAttribute("alt", alt);
    },
  );

  it.each([[QuestionStatusEnum.DEFAULT], [QuestionStatusEnum.SELECTED]])(
    "does not return icon for QuestionStatusEnum %s",
    (status: QuestionStatusEnum): void => {
      setup({
        status,
      });

      const element: HTMLElement | null = screen.queryByTestId(
        testComponentDataTestId,
      );

      expect(element).not.toBeInTheDocument();
    },
  );
});
