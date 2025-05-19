import Headline, {
  HeadlineProps,
} from "@/components/atoms/Headline/Headline.tsx";
import { render } from "@testing-library/react";
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

describe("Headline Component", (): void => {
  const title: string = "title";

  const setup = (propsOverride?: HeadlineProps): { container: HTMLElement } => {
    const defaultProps: HeadlineProps = {
      title,
    };

    const props: HeadlineProps = { ...defaultProps, ...propsOverride };
    return render(<Headline {...props} />);
  };

  const useDarkModeMock: boolean = false;

  beforeEach((): void => {
    (useDarkMode as jest.Mock).mockReturnValue(useDarkModeMock);
  });

  it("renders h1 headline", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".headline");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(title);
    expect(element).toHaveAttribute("aria-label", title);
    expect(element).not.toHaveClass("headline--darkMode");
  });

  it("renders darkMode class when isDarkModeOn === true", (): void => {
    (useDarkMode as jest.Mock).mockReturnValue(true);
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".headline");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("headline--darkMode");
  });
});
