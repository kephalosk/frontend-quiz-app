import SliderBar, {
  SliderBarProps,
} from "@/components/atoms/Slider/SliderBar/SliderBar.tsx";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";

describe("SliderBarValueAdjuster Component", (): void => {
  const childrenDataTestId: string = "children";
  const children: ReactNode = <div data-testid={childrenDataTestId}></div>;
  const setup = (
    propsOverride?: Partial<SliderBarProps>,
  ): { container: HTMLElement } => {
    const defaultProps: SliderBarProps = {
      children,
    };

    const props = { ...defaultProps, ...propsOverride };
    return render(<SliderBar {...props} />);
  };

  it("renders div sliderBar", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".sliderBar");

    expect(element).toBeInTheDocument();
  });

  it("renders children", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(childrenDataTestId);

    expect(element).toBeInTheDocument();
  });
});
