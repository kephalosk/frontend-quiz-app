import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import { KeyClickBypassHook } from "@/globals/models/types/KeyClickBypassTypes.ts";
import useQuizButtonBehavior from "@/hooks/quizButton/useQuizButtonBehavior.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import { QuizButtonBehaviorHook } from "@/globals/models/types/QuizButtonTypes.ts";

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

const handleButtonClickMock: jest.Mock = jest.fn();

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC<{
  status: QuestionStatusEnum;
  isDisabled: boolean;
}> = ({ status, isDisabled }) => {
  const { ref, isClickable, buttonEventProps }: QuizButtonBehaviorHook =
    useQuizButtonBehavior(handleButtonClickMock, status, isDisabled);

  return (
    <button
      ref={ref}
      data-testid={testComponentDataTestId}
      {...buttonEventProps}
    >{`${isClickable}`}</button>
  );
};

describe("useQuizButtonBehavior Hook", (): void => {
  const status: QuestionStatusEnum = QuestionStatusEnum.DEFAULT;
  const isDisabled: boolean = false;

  const setup = (propsOverride?: {
    status: QuestionStatusEnum;
    isDisabled: boolean;
  }): void => {
    const defaultProps: {
      status: QuestionStatusEnum;
      isDisabled: boolean;
    } = {
      status,
      isDisabled,
    };
    const props: {
      status: QuestionStatusEnum;
      isDisabled: boolean;
    } = { ...defaultProps, ...propsOverride };
    render(<TestComponent {...props} />);
  };

  it("returns buttonEventProp onClick", (): void => {
    setup({
      status: QuestionStatusEnum.DEFAULT,
      isDisabled: false,
    });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it("returns buttonEventProp onKeyDown", (): void => {
    setup({
      status: QuestionStatusEnum.DEFAULT,
      isDisabled: false,
    });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.keyDown(element);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
  });

  it("returns buttonEventProp onMouseDown", (): void => {
    setup({
      status: QuestionStatusEnum.DEFAULT,
      isDisabled: false,
    });

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.mouseDown(element);

    expect(handlePointerUpMock).toHaveBeenCalledTimes(1);
  });

  it.each([
    [QuestionStatusEnum.DEFAULT, true],
    [QuestionStatusEnum.SELECTED, false],
    [QuestionStatusEnum.CORRECTED, false],
    [QuestionStatusEnum.RIGHT, false],
    [QuestionStatusEnum.WRONG, false],
  ])(
    "does not return buttonEventProps when status is %s and isDisabled is %s",
    (status: QuestionStatusEnum, isDisabled: boolean): void => {
      setup({
        status,
        isDisabled,
      });

      const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
      waitFor(() => {
        fireEvent.click(element);
        fireEvent.keyDown(element);
        fireEvent.mouseDown(element);
      });

      expect(handleClickMock).not.toHaveBeenCalled();
      expect(handleKeyDownMock).not.toHaveBeenCalled();
      expect(handlePointerUpMock).not.toHaveBeenCalled();
    },
  );

  it("calls useKeyClickBypass", (): void => {
    setup();

    expect(useKeyClickBypass).toHaveBeenCalledTimes(1);
    expect(useKeyClickBypass).toHaveBeenCalledWith(handleButtonClickMock);
    expect(useKeyClickBypass).toHaveReturnedWith({
      handleClick: handleClickMock,
      handleKeyDown: handleKeyDownMock,
    });
  });

  it("calls useBlurOnPointerUp", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(useBlurOnPointerUp).toHaveBeenCalledTimes(1);
    expect(useBlurOnPointerUp).toHaveBeenCalledWith({ current: element });
    expect(useBlurOnPointerUp).toHaveReturnedWith(handlePointerUpMock);
  });
});
