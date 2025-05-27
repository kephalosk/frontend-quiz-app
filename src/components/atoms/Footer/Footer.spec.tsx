import { render } from "@testing-library/react";
import Footer from "@/components/atoms/Footer/Footer.tsx";
import {
  FRONTEND_MENTOR_NAME,
  FRONTEND_MENTOR_PREFIX,
  FRONTEND_MENTOR_SUFFIX,
  GITHUB_PROFILE_NAME,
} from "@/globals/constants/Constants.ts";
import {
  FRONTEND_MENTOR_SRC,
  GITHUB_SRC,
} from "@/globals/constants/Ressources.ts";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";

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

describe("Footer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<Footer />);
  };

  const useDarkModeMock: boolean = false;

  beforeEach((): void => {
    (useDarkMode as jest.Mock).mockReturnValue(useDarkModeMock);
  });

  const attributionSelector: string = "attribution";
  const attributionPrefixSelector: string = "attributionPrefix";
  const attributionFrontendMentor: string = "attributionFrontendMentor";
  const attributionSuffixSelector: string = "attributionSuffix";
  const attributionPersonalProfileSelector: string =
    "attributionPersonalProfile";

  it(`renders footer ${attributionSelector}`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${attributionSelector}`,
    );

    expect(element).toBeInTheDocument();
  });

  it.each([
    ["darkMode", true],
    ["lightMode", false],
  ])(
    `renders footer ${attributionSelector} with %s`,
    (mode: string, isDarkModeOn: boolean): void => {
      (useDarkMode as jest.Mock).mockReturnValue(isDarkModeOn);
      const { container } = setup();

      const element: HTMLElement | null = container.querySelector(
        `.${attributionSelector}`,
      );

      expect(element).toHaveClass(`${attributionSelector}--${mode}`);
    },
  );

  it(`renders span ${attributionPrefixSelector}`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${attributionPrefixSelector}`,
    );

    expect(element).toBeInTheDocument();
    expect(element!.innerHTML).toEqual(FRONTEND_MENTOR_PREFIX);
  });

  it(`renders a ${attributionFrontendMentor}`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${attributionFrontendMentor}`,
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", FRONTEND_MENTOR_SRC);
    expect(element).toHaveAttribute("target", "_blank");
    expect(element!.innerHTML).toEqual(FRONTEND_MENTOR_NAME);
  });

  it(`renders span ${attributionSuffixSelector}`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${attributionSuffixSelector}`,
    );

    expect(element).toBeInTheDocument();
    expect(element!.innerHTML).toEqual(FRONTEND_MENTOR_SUFFIX);
  });

  it(`renders a ${attributionPersonalProfileSelector}`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${attributionPersonalProfileSelector}`,
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", GITHUB_SRC);
    expect(element).toHaveAttribute("target", "_blank");
    expect(element!.innerHTML).toEqual(GITHUB_PROFILE_NAME);
  });

  it(`calls hook useDarkMode`, (): void => {
    setup();

    expect(useDarkMode).toHaveBeenCalledTimes(1);
    expect(useDarkMode).toHaveBeenCalledWith();
    expect(useDarkMode).toHaveReturnedWith(useDarkModeMock);
  });
});
