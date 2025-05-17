import { fireEvent, render, screen } from "@testing-library/react";
import {
  CORRECT_ICON_ALT_TEXT,
  TOPIC_BUTTON_ARIA_LABEL_PREFIX,
} from "@/globals/constants/Constants.ts";
import { CORRECT_ICON_SRC } from "@/globals/constants/Ressources.ts";
import useDarkMode from "@/hooks/redux/darkMode/useDarkMode.ts";
import { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import TopicButton, {
  TopicButtonProps,
} from "@/components/container/TopicButton/TopicButton.tsx";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import useTopicButtonIcon from "@/hooks/topicButton/useTopicButtonIcon.ts";
import { KeyClickBypassHook } from "@/globals/models/types/KeyClickBypassTypes.ts";
import { TopicButtonIconHook } from "@/globals/models/types/TopicTypes.ts";
import { TopicEnumColor } from "@/globals/models/enums/TopicEnumColor.ts";

jest.mock(
  "@/hooks/button/useKeyClickBypass.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/button/useBlurOnPointerUp.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/topicButton/useTopicButtonIcon.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/darkMode/useDarkMode.ts",
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

describe("TopicButton component", (): void => {
  const text: string = "reset";
  const type: TopicEnum = TopicEnum.HTML;
  const handleButtonClickMock: jest.Mock = jest.fn();

  const setup = (
    propsOverride?: Partial<TopicButtonProps>,
  ): { container: HTMLElement } => {
    const defaultProps: TopicButtonProps = {
      text,
      type,
      handleButtonClick: handleButtonClickMock,
    };

    const props: TopicButtonProps = { ...defaultProps, ...propsOverride };

    return render(<TopicButton {...props} />);
  };

  const handleClickMock: jest.Mock = jest.fn();
  const handleKeyDownMock: jest.Mock = jest.fn();
  const useKeyClickBypassMock: KeyClickBypassHook = {
    handleClick: handleClickMock,
    handleKeyDown: handleKeyDownMock,
  };

  const useBlurOnPointerUpMock: jest.Mock = jest.fn();

  const srcMock: string = CORRECT_ICON_SRC;
  const altMock: string = CORRECT_ICON_ALT_TEXT;
  const colorMock: TopicEnumColor = TopicEnumColor.HTML;
  const useTopicButtonIconMock: TopicButtonIconHook = {
    src: srcMock,
    alt: altMock,
    color: colorMock,
  };

  const useDarkModeMock: boolean = true;

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  beforeEach((): void => {
    (useKeyClickBypass as jest.Mock).mockReturnValue(useKeyClickBypassMock);
    (useBlurOnPointerUp as jest.Mock).mockReturnValue(useBlurOnPointerUpMock);
    (useTopicButtonIcon as jest.Mock).mockReturnValue(useTopicButtonIconMock);
    (useDarkMode as jest.Mock).mockReturnValue(useDarkModeMock);
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("renders div topicButton", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".topicButton");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("type", "button");
    expect(element).toHaveAttribute(
      "aria-label",
      `${TOPIC_BUTTON_ARIA_LABEL_PREFIX}${text}`,
    );
    expect(element).toHaveAttribute("tabindex", "0");
  });

  it.each([
    [true, "darkMode"],
    [false, "lightMode"],
  ])(
    "renders div topicButton with darkMode === %s",
    (isDarkModeOn: boolean, mode: string): void => {
      (useDarkMode as jest.Mock).mockReturnValue(isDarkModeOn);
      const { container } = setup();

      const element: HTMLElement | null =
        container.querySelector(".topicButton");

      expect(element).toHaveClass(`topicButton--${mode}`);
    },
  );

  it("renders img quizButtonIcon", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".topicButtonIcon");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`topicButtonIcon--${colorMock}`);
    expect(element).toHaveAttribute("src", srcMock);
    expect(element).toHaveAttribute("alt", altMock);
    expect(element).toHaveAttribute("aria-hidden", "true");
  });

  it("renders component Label with passed prop text", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(labelDataTestId);

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(1);
    expect(Label).toHaveBeenCalledWith(
      {
        className: "topicButtonText",
        type: LabelTypeEnum.QUIZ_BUTTON_LABEL,
        text,
      },
      undefined,
    );
  });

  it("calls handleClick on click", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".topicButton");
    fireEvent.click(element!);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls handleKeyDown on key down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".topicButton");
    fireEvent.keyDown(element!);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
    expect(handleKeyDownMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls handlePointerUp on mouse down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".topicButton");
    fireEvent.mouseDown(element!);

    expect(useBlurOnPointerUpMock).toHaveBeenCalledTimes(1);
    expect(useBlurOnPointerUpMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls hook useKeyClickBypass", (): void => {
    setup({ handleButtonClick: handleButtonClickMock });

    expect(useKeyClickBypass).toHaveBeenCalledTimes(1);
    expect(useKeyClickBypass).toHaveBeenCalledWith(handleButtonClickMock);
  });

  it("calls hook useBlurOnPointerUp", (): void => {
    const { container } = setup({ handleButtonClick: handleButtonClickMock });

    const element: HTMLElement | null = container.querySelector(".topicButton");

    expect(useBlurOnPointerUp).toHaveBeenCalledTimes(1);
    expect(useBlurOnPointerUp).toHaveBeenCalledWith({ current: element });
  });

  it("calls hook useTopicButtonIcon", (): void => {
    setup();

    expect(useTopicButtonIcon).toHaveBeenCalledTimes(1);
    expect(useTopicButtonIcon).toHaveBeenCalledWith(type);
  });

  it("calls hook useDarkMode", (): void => {
    setup({ handleButtonClick: handleButtonClickMock });

    expect(useDarkMode).toHaveBeenCalledTimes(1);
    expect(useDarkMode).toHaveBeenCalledWith();
  });
});
