import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { KeyClickBypassHook } from "@/globals/models/types/KeyClickBypassTypes.ts";
import { QuizButtonHandleButtonClickHook } from "@/globals/models/types/QuizButtonTypes.ts";
import useQuizButtonHandleButtonClick from "@/hooks/quizButton/useQuizButtonHandleButtonClick.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";

const handleClickMock: jest.Mock = jest.fn();
const handleKeyDownMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/button/useKeyClickBypass.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn((): KeyClickBypassHook => {
      return {
        handleClick: handleClickMock,
        handleKeyDown: handleKeyDownMock,
      };
    }),
  }),
);

const handlePointerUpMock: jest.Mock = jest.fn();
jest.mock(
  "@/hooks/button/useBlurOnPointerUp.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(() => handlePointerUpMock),
  }),
);

const propagateAnswerMock: jest.Mock = jest.fn();
const textMock: string = "test";
const positionMock: QuestionPositionEnum = QuestionPositionEnum.A;

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { handleButtonClick }: QuizButtonHandleButtonClickHook =
    useQuizButtonHandleButtonClick(propagateAnswerMock, textMock, positionMock);

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={handleButtonClick}
    ></div>
  );
};

describe("useQuizButtonHandleButtonClick Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  it("calls propagateAnswer when handleButtonClick is triggered", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(propagateAnswerMock).toHaveBeenCalledTimes(1);
    expect(propagateAnswerMock).toHaveBeenCalledWith(textMock, positionMock);
  });
});
