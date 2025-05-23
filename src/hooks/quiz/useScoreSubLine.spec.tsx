import React from "react";
import { render, screen } from "@testing-library/react";
import useScoreSubLine from "@/hooks/quiz/useScoreSubLine.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";
import { SCORE_SUB_LINE_LABEL_PREFIX } from "@/globals/constants/Constants.ts";

jest.mock(
  "@/hooks/redux/topic/selector/useQuestions.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const scoreSubLine: string = useScoreSubLine();

  return <div data-testid={testComponentDataTestId}>{scoreSubLine}</div>;
};

describe("useScoreSubLine Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const questionsMock: EPQuestion[] = mockedQuestions;

  beforeEach((): void => {
    (useQuestions as jest.Mock).mockReturnValue(questionsMock);
  });

  it("returns score subline", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element.textContent).toEqual(
      `${SCORE_SUB_LINE_LABEL_PREFIX}${mockedQuestions.length}`,
    );
  });

  it("calls hook useQuestions", (): void => {
    setup();

    expect(useQuestions).toHaveBeenCalledTimes(1);
    expect(useQuestions).toHaveBeenCalledWith();
    expect(useQuestions).toHaveReturnedWith(questionsMock);
  });
});
