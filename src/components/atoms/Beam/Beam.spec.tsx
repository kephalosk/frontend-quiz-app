import Beam, { BeamProps } from "@/components/atoms/Beam/Beam.tsx";
import { render } from "@testing-library/react";
import { BeamColorEnum } from "@/globals/models/enums/BeamColorEnum.ts";

describe("Beam Component", (): void => {
  const color: BeamColorEnum = BeamColorEnum.GREEN;

  const setup = (propsOverride?: BeamProps): { container: HTMLElement } => {
    const defaultProps: BeamProps = {
      color,
    };

    const props: BeamProps = { ...defaultProps, ...propsOverride };
    return render(<Beam {...props} />);
  };

  it("renders div beam", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".beam");

    expect(element).toBeInTheDocument();
  });

  it.each([
    [BeamColorEnum.GREEN],
    [BeamColorEnum.YELLOW],
    [BeamColorEnum.ORANGE],
    [BeamColorEnum.RED],
    [BeamColorEnum.TRANSPARENT],
  ])("renders beam with color %s", (color: BeamColorEnum): void => {
    const { container } = setup({ color });

    const element: HTMLElement | null = container.querySelector(".beam");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(color);
  });

  it("renders beam with default color if prop color is undefined", (): void => {
    const { container } = setup({ color: undefined });

    const element: HTMLElement | null = container.querySelector(".beam");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(BeamColorEnum.TRANSPARENT);
  });
});
