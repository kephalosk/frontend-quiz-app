import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import TitleContainer from "@/components/container/TitleContainer/TitleContainer.tsx";
import useRouterStartPage from "@/hooks/router/useRouterStartPage.ts";
import StartPage from "@/pages/StartPage/StartPage.tsx";
import TopicButtonContainer from "@/components/container/TopicButtonContainer/TopicButtonContainer";
import {
  STARTPAGE_HEADLINE_BOLD_TEXT,
  STARTPAGE_HEADLINE_TEXT,
  STARTPAGE_SUB_LINE_TEXT,
} from "@/globals/constants/Constants.ts";

jest.mock(
  "@/hooks/router/useRouterStartPage.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const titleContainerDataTestId: string = "title-container";
jest.mock(
  "@/components/container/TitleContainer/TitleContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={titleContainerDataTestId}></div>;
    }),
);

const topicButtonContainerDataTestId: string = "topic-button-container";
jest.mock(
  "@/components/container/TopicButtonContainer/TopicButtonContainer",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={topicButtonContainerDataTestId}></div>;
    }),
);

describe("StartPage Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<StartPage />);
  };

  it(`renders div startPage`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".startPage");

    expect(element).toBeInTheDocument();
  });

  it("renders component TitleContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(titleContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(TitleContainer).toHaveBeenCalledTimes(1);
    expect(TitleContainer).toHaveBeenCalledWith(
      {
        firstLine: STARTPAGE_HEADLINE_TEXT,
        headline: STARTPAGE_HEADLINE_BOLD_TEXT,
        subLine: STARTPAGE_SUB_LINE_TEXT,
      },
      undefined,
    );
  });

  it("renders component TopicButtonContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      topicButtonContainerDataTestId,
    );

    expect(element).toBeInTheDocument();
    expect(TopicButtonContainer).toHaveBeenCalledTimes(1);
    expect(TopicButtonContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("calls hook useRouterStartPage", (): void => {
    setup();

    expect(useRouterStartPage).toHaveBeenCalledTimes(1);
    expect(useRouterStartPage).toHaveBeenCalledWith();
    expect(useRouterStartPage).toHaveReturnedWith(undefined);
  });
});
