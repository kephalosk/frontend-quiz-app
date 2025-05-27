import Footer from "@/components/atoms/Footer/Footer.tsx";
import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import App from "@/App.tsx";
import HeaderContainer from "@/components/container/HeaderContainer/HeaderContainer.tsx";
import { Route, Routes } from "react-router-dom";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";
import {
  QUIZ_SUB_PATH,
  RESULT_SUB_PATH,
  STARTPAGE_PATH,
} from "@/globals/constants/Ressources.ts";
import StartPage from "@/pages/StartPage/StartPage.tsx";
import ResultPage from "@/pages/ResultPage/ResultPage.tsx";
import QuizPage from "@/pages/QuizPage/QuizPage.tsx";

const headerContainerDataTestId: string = "header-container";
jest.mock(
  "@/components/container/HeaderContainer/HeaderContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={headerContainerDataTestId}></div>;
    }),
);

const routesDataTestId: string = "Routes";
const routeDataTestId: string = "Route";
jest.mock(
  "react-router-dom",
  (): {
    __esModule: boolean;
    Routes: jest.Mock;
    Route: jest.Mock;
  } => ({
    __esModule: true,
    Routes: jest.fn((props): ReactElement => {
      return <div data-testid={routesDataTestId}>{props.children}</div>;
    }),
    Route: jest.fn((): ReactElement => {
      return <div data-testid={routeDataTestId}></div>;
    }),
  }),
);

const footerDataTestId: string = "footer";
jest.mock(
  "@/components/atoms/Footer/Footer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={footerDataTestId}></div>;
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
  "@/pages/StartPage/StartPage.tsx",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/pages/QuizPage/QuizPage.tsx",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/pages/ResultPage/ResultPage.tsx",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("App Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<App />);
  };

  const useDarkModeMock: boolean = false;

  beforeEach((): void => {
    (useDarkMode as jest.Mock).mockReturnValue(useDarkModeMock);
  });

  it.each([
    [true, "darkMode"],
    [false, "lightMode"],
  ])(
    `renders div app with isDarkModeOn === %s`,
    (isDarkModeOn: boolean, className: string): void => {
      (useDarkMode as jest.Mock).mockReturnValue(isDarkModeOn);
      const { container } = setup();

      const element: HTMLElement | null = container.querySelector(".app");

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(`app--${className}`);
    },
  );

  it("renders component HeaderContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(headerContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(HeaderContainer).toHaveBeenCalledTimes(1);
    expect(HeaderContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component Routes", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(routesDataTestId);

    expect(element).toBeInTheDocument();
    expect(Routes).toHaveBeenCalledTimes(1);
    expect(Routes).toHaveBeenCalledWith(expect.any(Object), undefined);
  });

  it("renders components Route", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(routeDataTestId);

    expect(elements).toHaveLength(4);
    expect(Route).toHaveBeenCalledTimes(4);
    expect(Route).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: STARTPAGE_PATH,
        element: expect.objectContaining({
          type: StartPage,
        }),
      }),
      undefined,
    );
    expect(Route).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: `${STARTPAGE_PATH}${QUIZ_SUB_PATH}`,
        element: expect.objectContaining({
          type: QuizPage,
        }),
      }),
      undefined,
    );
    expect(Route).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        path: `${STARTPAGE_PATH}${RESULT_SUB_PATH}`,
        element: expect.objectContaining({
          type: ResultPage,
        }),
      }),
      undefined,
    );
    expect(Route).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        path: "*",
        element: expect.objectContaining({
          type: StartPage,
        }),
      }),
      undefined,
    );
  });

  it(`renders component Footer`, (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(footerDataTestId);

    expect(element).toBeInTheDocument();
    expect(Footer).toHaveBeenCalledTimes(1);
    expect(Footer).toHaveBeenCalledWith({}, undefined);
  });

  it(`calls hook useDarkMode`, (): void => {
    setup();

    expect(useDarkMode).toHaveBeenCalledTimes(1);
    expect(useDarkMode).toHaveBeenCalledWith();
    expect(useDarkMode).toHaveReturnedWith(useDarkModeMock);
  });
});
