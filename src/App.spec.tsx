import Headline from "@/components/atoms/Headline/Headline.tsx";
import { HEADLINE_TEXT } from "@/globals/constants/Constants.ts";
import PasswordContainer from "@/components/container/PasswordContainer/PasswordContainer.tsx";
import ContentContainer from "@/components/container/ContentContainer/ContentContainer.tsx";
import Footer from "@/components/atoms/Footer/Footer.tsx";
import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import App from "@/App.tsx";
import usePasswordChange from "@/hooks/password/usePasswordChange.ts";
import { PasswordChangeHook } from "@/globals/models/types/PasswordChangeTypes.ts";

const headlineDataTestId: string = "headline";
jest.mock(
  "@/components/atoms/Headline/Headline.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={headlineDataTestId}></div>;
    }),
);

const passwordContainerDataTestId: string = "password-container";
jest.mock(
  "@/components/container/PasswordContainer/PasswordContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={passwordContainerDataTestId}></div>;
    }),
);

const contentContainerDataTestId: string = "content-container";
jest.mock(
  "@/components/container/ContentContainer/ContentContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={contentContainerDataTestId}></div>;
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
  "@/hooks/password/usePasswordChange.ts",
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

  const password: string = "password";
  const handlePasswordChangeMock: jest.Mock = jest.fn();
  const usePasswordChangeMock: PasswordChangeHook = {
    password,
    handlePasswordChange: handlePasswordChangeMock,
  };

  beforeEach((): void => {
    (usePasswordChange as jest.Mock).mockReturnValue(usePasswordChangeMock);
  });

  it(`renders div app`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".app");

    expect(element).toBeInTheDocument();
  });

  it("renders component Headline", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(headlineDataTestId);

    expect(element).toBeInTheDocument();
    expect(Headline).toHaveBeenCalledTimes(1);
    expect(Headline).toHaveBeenCalledWith({ title: HEADLINE_TEXT }, undefined);
  });

  it("renders component PasswordContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      passwordContainerDataTestId,
    );

    expect(element).toBeInTheDocument();
    expect(PasswordContainer).toHaveBeenCalledTimes(1);
    expect(PasswordContainer).toHaveBeenCalledWith({ password }, undefined);
  });

  it("renders component ContentContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(contentContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(ContentContainer).toHaveBeenCalledTimes(1);
    expect(ContentContainer).toHaveBeenCalledWith(
      { propagateValue: handlePasswordChangeMock },
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

  it(`calls hook usePasswordChange`, (): void => {
    setup();

    expect(usePasswordChange).toHaveBeenCalledTimes(1);
    expect(usePasswordChange).toHaveBeenCalledWith();
  });
});
