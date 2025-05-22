import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { UpdateSelectionResultHook } from "@/globals/models/types/QuizTypes.ts";
import useUpdateSelectionResult, {
  useUpdateSelectionResultProps,
} from "@/hooks/quiz/subhooks/useUpdateSelectionResult.ts";

const updateValueMock: boolean = true;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<useUpdateSelectionResultProps> = ({
  setIsSelectedAnswerCorrect,
  setIsAnswerSelected,
}: useUpdateSelectionResultProps) => {
  const { updateSelectionResult }: UpdateSelectionResultHook =
    useUpdateSelectionResult({
      setIsSelectedAnswerCorrect,
      setIsAnswerSelected,
    });

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => updateSelectionResult(updateValueMock)}
    ></div>
  );
};

describe("useUpdateSelectionResult Hook", (): void => {
  const setIsSelectedAnswerCorrect: jest.Mock = jest.fn();
  const setIsAnswerSelected: jest.Mock = jest.fn();

  const setup = (
    propsOverride?: Partial<useUpdateSelectionResultProps>,
  ): void => {
    const defaultProps: useUpdateSelectionResultProps = {
      setIsSelectedAnswerCorrect,
      setIsAnswerSelected,
    };
    const props: useUpdateSelectionResultProps = {
      ...defaultProps,
      ...propsOverride,
    };
    render(<TestComponent {...props} />);
  };

  it("sets isSelectedAnswerCorrect with passed value if updateSelectionResult is called", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(setIsSelectedAnswerCorrect).toHaveBeenCalledTimes(1);
    expect(setIsSelectedAnswerCorrect).toHaveBeenCalledWith(updateValueMock);
  });

  it("sets isAnswerSelected to true if updateSelectionResult is called", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(setIsAnswerSelected).toHaveBeenCalledTimes(1);
    expect(setIsAnswerSelected).toHaveBeenCalledWith(true);
  });

  it("does nothing if updateSelectionResult is not called", (): void => {
    setup();

    expect(setIsSelectedAnswerCorrect).not.toHaveBeenCalled();
    expect(setIsAnswerSelected).not.toHaveBeenCalled();
  });
});
