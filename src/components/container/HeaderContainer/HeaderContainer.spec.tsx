import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import HeaderContainer from "@/components/container/HeaderContainer/HeaderContainer.tsx";
import DarkModeSwitch from "@/components/container/DarkModeSwitch/DarkModeSwitch.tsx";
import TopicContainer from "@/components/container/TopicContainer/TopicContainer.tsx";

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

  it("renders component DarkModeSwitch", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(darkModeSwitchDataTestId);

    expect(element).toBeInTheDocument();
    expect(DarkModeSwitch).toHaveBeenCalledTimes(1);
    expect(DarkModeSwitch).toHaveBeenCalledWith({}, undefined);
  });
});
