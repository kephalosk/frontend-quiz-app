import { render } from "@testing-library/react";
import ProgressBar, {
  ProgressBarProps,
} from "@/components/atoms/ProgressBar/ProgressBar.tsx";

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

  it("renders div progressBar", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".progressBar");

    expect(element).toBeInTheDocument();
  });

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
