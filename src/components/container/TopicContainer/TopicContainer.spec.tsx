import { render, screen } from "@testing-library/react";
import {
  CORRECT_ICON_ALT_TEXT,
  EMPTY_STRING,
} from "@/globals/constants/Constants.ts";
import { CORRECT_ICON_SRC } from "@/globals/constants/Ressources.ts";
import { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import useTopicButtonIcon from "@/hooks/topicButton/useTopicButtonIcon.ts";
import {
  TopicButtonIconHook,
  TopicTextAndTypeHook,
} from "@/globals/models/types/TopicTypes.ts";
import { TopicEnumColor } from "@/globals/models/enums/TopicEnumColor.ts";
import TopicContainer from "@/components/container/TopicContainer/TopicContainer.tsx";
import useTopicTextAndType from "@/hooks/topic/useTopicTextAndType.ts";

jest.mock(
  "@/hooks/topic/useTopicTextAndType.ts",
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

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={labelDataTestId} className={props.type}></div>;
    }),
);

describe("TopicContainer component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TopicContainer />);
  };

  const textMock: string = "reset";
  const typeMock: TopicEnum = TopicEnum.HTML;
  const useTopicTextAndTypeMock: TopicTextAndTypeHook = {
    text: textMock,
    type: typeMock,
  };

  const srcMock: string = CORRECT_ICON_SRC;
  const altMock: string = CORRECT_ICON_ALT_TEXT;
  const colorMock: TopicEnumColor = TopicEnumColor.HTML;
  const useTopicButtonIconMock: TopicButtonIconHook = {
    src: srcMock,
    alt: altMock,
    color: colorMock,
  };
  beforeAll((): void => {
    jest.useFakeTimers();
  });

  beforeEach((): void => {
    (useTopicTextAndType as jest.Mock).mockReturnValue(useTopicTextAndTypeMock);
    (useTopicButtonIcon as jest.Mock).mockReturnValue(useTopicButtonIconMock);
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("renders div topicContainer with !text.length === true", (): void => {
    (useTopicTextAndType as jest.Mock).mockReturnValue({
      ...useTopicTextAndTypeMock,
      text: EMPTY_STRING,
    });
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".topicContainer");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("topicContainer--hidden");
  });

  it("does not render hidden class with !text.length === false", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".topicContainer");

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass("topicContainer--hidden");
  });

  it("renders img topicContainerIcon", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".topicContainerIcon",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`topicContainerIcon--${colorMock}`);
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
        className: "topicContainerText",
        type: LabelTypeEnum.QUIZ_BUTTON_LABEL,
        text: textMock,
      },
      undefined,
    );
  });

  it("calls hook useTopicTextAndType", (): void => {
    setup();

    expect(useTopicTextAndType).toHaveBeenCalledTimes(1);
    expect(useTopicTextAndType).toHaveBeenCalledWith();
  });

  it("calls hook useTopicButtonIcon", (): void => {
    setup();

    expect(useTopicButtonIcon).toHaveBeenCalledTimes(1);
    expect(useTopicButtonIcon).toHaveBeenCalledWith(typeMock);
  });
});
