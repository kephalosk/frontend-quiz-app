import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { stateMock } from "@/redux/fixtures/stateMock.ts";
import useQuestions from "@/hooks/redux/topic/selector/useQuestions.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";

jest.mock(
  "react-redux",
  (): {
    useSelector: jest.Mock;
  } => ({
    useSelector: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const quizErrors: EPQuestion[] = useQuestions();
  return (
    <div>
      {quizErrors.map(
        (question: EPQuestion, index: number): ReactElement => (
          <div key={index} data-testid={testComponentDataTestId}>
            {question.question}
          </div>
        ),
      )}
    </div>
  );
};

describe("useQuestions hook", (): void => {
  const expectedState: EPQuestion[] = mockedQuestions;

  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const state: RootState = {
    ...stateMock,
    topic: { ...stateMock.topic, questions: expectedState },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(state),
    );
  });

  it("returns questions", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      testComponentDataTestId,
    );

    expect(elements).toHaveLength(expectedState.length);
    elements.forEach((element: HTMLElement, index: number) => {
      expect(element.innerHTML).toEqual(`${expectedState.at(index)!.question}`);
    });
    expect(useSelector).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
    expect(useSelector).toHaveReturnedWith(expectedState);
  });
});
