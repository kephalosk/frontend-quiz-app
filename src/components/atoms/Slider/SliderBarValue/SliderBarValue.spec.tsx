import { render } from "@testing-library/react";
import SliderBarValue from "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx";

describe("SliderBarValueAdjuster Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<SliderBarValue />);
  };

  it("renders div sliderBarValue", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".sliderBarValue");

    expect(element).toBeInTheDocument();
  });
});
