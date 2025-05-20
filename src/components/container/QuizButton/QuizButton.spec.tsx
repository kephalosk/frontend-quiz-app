import { fireEvent, render, screen } from "@testing-library/react";
import {
  CORRECT_ICON_ALT_TEXT,
  QUIZ_BUTTON_ARIA_LABEL_PREFIX,
} from "@/globals/constants/Constants.ts";
import { CORRECT_ICON_SRC } from "@/globals/constants/Ressources.ts";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import QuizButton, {
  QuizButtonProps,
} from "@/components/container/QuizButton/QuizButton.tsx";
import useQuizButtonBehavior from "@/hooks/quizButton/useQuizButtonBehavior.ts";
import useQuizButtonIcon from "@/hooks/quizButton/useQuizButtonIcon.ts";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";
import useQuizButtonClasses from "@/hooks/quizButton/useQuizButtonClasses.ts";
import {
  QuizButtonBehaviorHook,
  QuizButtonClassesHook,
  QuizButtonIconHook,
} from "@/globals/models/types/QuizButtonTypes.ts";
import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";

jest.mock(
  "@/hooks/quizButton/useQuizButtonBehavior.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quizButton/useQuizButtonIcon.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/darkMode/selector/useDarkMode.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/quizButton/useQuizButtonClasses.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={labelDataTestId} className={props.type}></div>;
    }),
);

describe("QuizButton component", (): void => {
  const text: string = "reset";
  const position: QuestionPositionEnum = QuestionPositionEnum.A;
  const status: QuestionStatusEnum = QuestionStatusEnum.DEFAULT;
  const handleButtonClickMock: jest.Mock = jest.fn();
  const isDisabled: boolean = false;

  const setup = (
    propsOverride?: Partial<QuizButtonProps>,
  ): { container: HTMLElement } => {
    const defaultProps: QuizButtonProps = {
      text,
      position,
      status,
      propagateAnswer: handleButtonClickMock,
      isDisabled: isDisabled,
    };

    const props: QuizButtonProps = { ...defaultProps, ...propsOverride };

    return render(<QuizButton {...props} />);
  };

  const refMock: React.RefObject<HTMLButtonElement | null> = { current: null };
  const isClickableMock: boolean = true;
  const onClickMock: jest.Mock = jest.fn();
  const onKeyDownMock: jest.Mock = jest.fn();
  const onMouseDownMock: jest.Mock = jest.fn();
  const buttonEventPropsMock: {
    onClick?: MouseEventHandler;
    onKeyDown?: KeyboardEventHandler;
    onMouseDown?: MouseEventHandler;
  } = {
    onClick: onClickMock,
    onKeyDown: onKeyDownMock,
    onMouseDown: onMouseDownMock,
  };
  const useQuizButtonBehaviorMock: QuizButtonBehaviorHook = {
    ref: refMock,
    isClickable: isClickableMock,
    buttonEventProps: buttonEventPropsMock,
  };

  const showIconMock: boolean = true;
  const srcMock: string = CORRECT_ICON_SRC;
  const altMock: string = CORRECT_ICON_ALT_TEXT;
  const useQuizButtonIconMock: QuizButtonIconHook = {
    showIcon: showIconMock,
    src: srcMock,
    alt: altMock,
  };

  const useDarkModeMock: boolean = true;

  const quizButtonClassesMock: string = "quizButton";
  const quizButtonPositionClassesMock: string = "quizButtonPosition";
  const useQuizButtonClassesMock: QuizButtonClassesHook = {
    quizButtonClasses: quizButtonClassesMock,
    quizButtonPositionClasses: quizButtonPositionClassesMock,
  };

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  beforeEach((): void => {
    (useQuizButtonBehavior as jest.Mock).mockReturnValue(
      useQuizButtonBehaviorMock,
    );
    (useQuizButtonIcon as jest.Mock).mockReturnValue(useQuizButtonIconMock);
    (useDarkMode as jest.Mock).mockReturnValue(useDarkModeMock);
    (useQuizButtonClasses as jest.Mock).mockReturnValue(
      useQuizButtonClassesMock,
    );
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("renders div quizButton", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".quizButton");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("type", "button");
    expect(element).toHaveAttribute(
      "aria-label",
      `${QUIZ_BUTTON_ARIA_LABEL_PREFIX}${text}`,
    );
    expect(element).toHaveAttribute("aria-disabled", `${isDisabled}`);
    expect(element).toHaveAttribute("tabindex", "0");
  });

  it("renders div quizButtonWrapper", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".quizButtonWrapper");

    expect(element).toBeInTheDocument();
  });

  it("renders div quizButtonPosition with passed prop position", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".quizButtonPosition",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(position);
  });

  it("renders component Label with passed prop text", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(labelDataTestId);

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(1);
    expect(Label).toHaveBeenCalledWith(
      {
        className: "quizButtonText",
        type: LabelTypeEnum.QUIZ_BUTTON_LABEL,
        text,
      },
      undefined,
    );
  });

  it("renders img quizButtonIcon when showIcon === true", (): void => {
    (useQuizButtonIcon as jest.Mock).mockReturnValue({
      ...useQuizButtonIconMock,
      showIcon: true,
    });
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".quizButtonIcon");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("src", srcMock);
    expect(element).toHaveAttribute("alt", altMock);
    expect(element).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render img quizButtonIcon when showIcon === false", (): void => {
    (useQuizButtonIcon as jest.Mock).mockReturnValue({
      ...useQuizButtonIconMock,
      showIcon: false,
    });
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".quizButtonIcon");

    expect(element).not.toBeInTheDocument();
  });

  it("calls handleClick on click", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".quizButton");
    fireEvent.click(element!);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls handleKeyDown on key down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".quizButton");
    fireEvent.keyDown(element!);

    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    expect(onKeyDownMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls handlePointerUp on mouse down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".quizButton");
    fireEvent.mouseDown(element!);

    expect(onMouseDownMock).toHaveBeenCalledTimes(1);
    expect(onMouseDownMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("sets tabIndex to -1 if prop isDisabled is true", (): void => {
    (useQuizButtonBehavior as jest.Mock).mockReturnValue({
      ...useQuizButtonBehaviorMock,
      isClickable: false,
    });
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".quizButton");

    expect(element).toHaveAttribute("tabindex", "-1");
  });

  it("sets default value for prop isDisabled if it is undefined", (): void => {
    (useQuizButtonBehavior as jest.Mock).mockReturnValue({
      ...useQuizButtonBehaviorMock,
      isClickable: false,
    });
    const { container } = setup({ isDisabled: undefined });

    const element: HTMLElement | null = container.querySelector(".quizButton");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("aria-disabled", "true");
  });

  it("calls hook useQuizButtonBehavior", (): void => {
    setup({ propagateAnswer: handleButtonClickMock });

    expect(useQuizButtonBehavior).toHaveBeenCalledTimes(1);
    expect(useQuizButtonBehavior).toHaveBeenCalledWith(
      handleButtonClickMock,
      status,
      isDisabled,
    );
  });

  it("calls hook useQuizButtonIcon", (): void => {
    setup();

    expect(useQuizButtonIcon).toHaveBeenCalledTimes(1);
    expect(useQuizButtonIcon).toHaveBeenCalledWith(status);
  });

  it("calls hook useDarkMode", (): void => {
    setup({ propagateAnswer: handleButtonClickMock });

    expect(useDarkMode).toHaveBeenCalledTimes(1);
    expect(useDarkMode).toHaveBeenCalledWith();
  });

  it("calls hook useQuizButtonClasses", (): void => {
    setup();

    expect(useQuizButtonClasses).toHaveBeenCalledTimes(1);
    expect(useQuizButtonClasses).toHaveBeenCalledWith(
      useDarkModeMock,
      isDisabled,
      status,
    );
  });
});
