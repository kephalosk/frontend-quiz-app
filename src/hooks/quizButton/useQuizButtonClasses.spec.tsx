import React from "react";
import { render, screen } from "@testing-library/react";
import useQuizButtonClasses from "@/hooks/quizButton/useQuizButtonClasses.ts";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import { QuizButtonClassesHook } from "@/globals/models/types/QuizButtonTypes.ts";

const statusMock: QuestionStatusEnum = QuestionStatusEnum.DEFAULT;

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{
  isDarkModeOn: boolean;
  isDisabled: boolean;
}> = ({ isDarkModeOn, isDisabled }) => {
  const {
    quizButtonClasses,
    quizButtonPositionClasses,
  }: QuizButtonClassesHook = useQuizButtonClasses(
    isDarkModeOn,
    isDisabled,
    statusMock,
  );

  return (
    <div
      data-testid={testComponentDataTestId}
      className={`${quizButtonClasses} ${quizButtonPositionClasses}`}
    ></div>
  );
};

describe("useQuizButtonClasses Hook", (): void => {
  const isDarkModeOn: boolean = true;
  const isDisabled: boolean = true;

  const setup = (propsOverride?: {
    isDarkModeOn: boolean;
    isDisabled: boolean;
  }): void => {
    const defaultProps: {
      isDarkModeOn: boolean;
      isDisabled: boolean;
    } = {
      isDarkModeOn,
      isDisabled,
    };
    const props: {
      isDarkModeOn: boolean;
      isDisabled: boolean;
    } = { ...defaultProps, ...propsOverride };
    render(<TestComponent {...props} />);
  };

  it("returns all quizButtonClasses when isDarkModeOn === true and isDisabled === true", (): void => {
    const baseQuizButton: string = "quizButton";
    setup({
      isDarkModeOn: true,
      isDisabled: true,
    });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toHaveClass(baseQuizButton);
    expect(element).toHaveClass(`${baseQuizButton}__${statusMock}`);
    expect(element).toHaveClass(`${baseQuizButton}__${statusMock}--darkMode`);
    expect(element).toHaveClass(`disabled`);
  });

  it("returns all quizButtonClasses when isDarkModeOn === false and isDisabled === false", (): void => {
    const baseQuizButton: string = "quizButton";
    setup({
      isDarkModeOn: false,
      isDisabled: false,
    });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toHaveClass(baseQuizButton);
    expect(element).toHaveClass(`${baseQuizButton}__${statusMock}`);
    expect(element).toHaveClass(`${baseQuizButton}__${statusMock}--lightMode`);
    expect(element).not.toHaveClass(`disabled`);
  });

  it("returns all quizButtonPositionClasses", (): void => {
    const baseQuizButtonPosition: string = "quizButtonPosition";
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toHaveClass(baseQuizButtonPosition);
    expect(element).toHaveClass(`${baseQuizButtonPosition}__${statusMock}`);
  });
});
