import Headline, {
  HeadlineProps,
} from "@/components/atoms/Headline/Headline.tsx";
import { render } from "@testing-library/react";

describe("Headline Component", (): void => {
  const title: string = "title";

  const setup = (propsOverride?: HeadlineProps): { container: HTMLElement } => {
    const defaultProps: HeadlineProps = {
      title,
    };

    const props: HeadlineProps = { ...defaultProps, ...propsOverride };
    return render(<Headline {...props} />);
  };

  it("renders h1 headline", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".headline");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(title);
    expect(element).toHaveAttribute("aria-label", title);
  });
});
