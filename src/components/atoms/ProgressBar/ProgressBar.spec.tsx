import { render } from "@testing-library/react";
import ProgressBar, {
  ProgressBarProps,
} from "@/components/atoms/ProgressBar/ProgressBar.tsx";
import useDarkMode from "@/hooks/redux/darkMode/useDarkMode.ts";

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

describe("ProgressBar Component", (): void => {
  const progressPerCent: number = 50;

  const setup = (
    propsOverride?: Partial<ProgressBarProps>,
  ): { container: HTMLElement } => {
    const defaultProps: ProgressBarProps = {
      progressPerCent,
    };

    const props: ProgressBarProps = {
      ...defaultProps,
      ...propsOverride,
    };
    return render(<ProgressBar {...props} />);
  };

  const useDarkModeMock: boolean = true;

  beforeEach((): void => {
    (useDarkMode as jest.Mock).mockReturnValue(useDarkModeMock);
  });

  it("renders div progressBar", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".progressBar");

    expect(element).toBeInTheDocument();
  });

  it.each([
    [true, "darkMode"],
    [false, "lightMode"],
  ])(
    "renders div progressBar with darkMode === %s",
    (isDarkModeOn: boolean, mode: string): void => {
      (useDarkMode as jest.Mock).mockReturnValue(isDarkModeOn);
      const { container } = setup();

      const element: HTMLElement | null =
        container.querySelector(".progressBar");

      expect(element).toHaveClass(`progressBar--${mode}`);
    },
  );

  it("renders div progressBarValue", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".progressBarValue");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute(
      "style",
      `width: calc(${progressPerCent}% - 8px);`,
    );
  });
});
