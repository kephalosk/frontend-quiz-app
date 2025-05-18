import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import HeaderContainer from "@/components/container/HeaderContainer/HeaderContainer.tsx";
import DarkModeSwitch from "@/components/container/DarkModeSwitch/DarkModeSwitch.tsx";
import TopicContainer from "@/components/container/TopicContainer/TopicContainer.tsx";
import useShowTopic from "@/hooks/topic/useShowTopic.ts";

jest.mock(
  "@/hooks/topic/useShowTopic.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const topicContainerDataTestId: string = "topic-container";
jest.mock(
  "@/components/container/TopicContainer/TopicContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={topicContainerDataTestId}></div>;
    }),
);

const darkModeSwitchDataTestId: string = "dark-mode-switch";
jest.mock(
  "@/components/container/DarkModeSwitch/DarkModeSwitch.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={darkModeSwitchDataTestId}></div>;
    }),
);

describe("HeaderContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<HeaderContainer />);
  };

  const showTopicMock: boolean = true;

  beforeEach((): void => {
    (useShowTopic as jest.Mock).mockReturnValue(showTopicMock);
  });

  it(`renders div headerContainer`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".headerContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component TopicContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(topicContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(TopicContainer).toHaveBeenCalledTimes(1);
    expect(TopicContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("does not render component TopicContainer if showTopic is false", (): void => {
    (useShowTopic as jest.Mock).mockReturnValue(false);
    setup();

    const element: HTMLElement | null = screen.queryByTestId(
      topicContainerDataTestId,
    );

    expect(element).not.toBeInTheDocument();
    expect(TopicContainer).not.toHaveBeenCalled();
  });

  it("renders component DarkModeSwitch", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(darkModeSwitchDataTestId);

    expect(element).toBeInTheDocument();
    expect(DarkModeSwitch).toHaveBeenCalledTimes(1);
    expect(DarkModeSwitch).toHaveBeenCalledWith({}, undefined);
  });

  it("calls hook useShowTopic", (): void => {
    setup();

    expect(useShowTopic).toHaveBeenCalledTimes(1);
    expect(useShowTopic).toHaveBeenCalledWith();
    expect(useShowTopic).toHaveReturnedWith(showTopicMock);
  });
});
