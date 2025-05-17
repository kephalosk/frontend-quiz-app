import { render, screen } from "@testing-library/react";
import { CORRECT_ICON_ALT_TEXT } from "@/globals/constants/Constants.ts";
import { CORRECT_ICON_SRC } from "@/globals/constants/Ressources.ts";
import { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import useTopicButtonIcon from "@/hooks/topicButton/useTopicButtonIcon.ts";
import { TopicButtonIconHook } from "@/globals/models/types/TopicButtonTypes.ts";
import { TopicEnumColor } from "@/globals/models/enums/TopicEnumColor.ts";
import TopicContainer, {
  TopicContainerProps,
} from "@/components/container/TopicContainer/TopicContainer.tsx";

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
  const text: string = "reset";
  const type: TopicEnum = TopicEnum.HTML;

  const setup = (
    propsOverride?: Partial<TopicContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: TopicContainerProps = {
      text,
      type,
    };

    const props: TopicContainerProps = { ...defaultProps, ...propsOverride };

    return render(<TopicContainer {...props} />);
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
    (useTopicButtonIcon as jest.Mock).mockReturnValue(useTopicButtonIconMock);
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("renders div topicContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".topicContainer");

    expect(element).toBeInTheDocument();
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
        text,
      },
      undefined,
    );
  });

  it("calls hook useTopicButtonIcon", (): void => {
    setup();

    expect(useTopicButtonIcon).toHaveBeenCalledTimes(1);
    expect(useTopicButtonIcon).toHaveBeenCalledWith(type);
  });
});
