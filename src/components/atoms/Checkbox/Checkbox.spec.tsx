import { render } from "@testing-library/react";
import Checkbox, {
  CheckboxProps,
} from "@/components/atoms/Checkbox/Checkbox.tsx";
import { CHECK_ICON_SRC } from "@/globals/constants/Ressources.ts";
import { CHECKBOX_ICON_ALT_TEXT } from "@/globals/constants/Constants.ts";

describe("Checkbox Component", (): void => {
  const isChecked: boolean = true;

  const setup = (
    propsOverride?: Partial<CheckboxProps>,
  ): { container: HTMLElement } => {
    const defaultProps: CheckboxProps = {
      isChecked,
    };

    const props: CheckboxProps = { ...defaultProps, ...propsOverride };
    return render(<Checkbox {...props} />);
  };

  it("renders div checkbox with passed prop isChecked = true", (): void => {
    const { container } = setup({ isChecked: true });

    const element: HTMLElement | null = container.querySelector(".checkbox");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("isChecked");
  });

  it("renders div checkbox with passed prop isChecked = false", (): void => {
    const { container } = setup({ isChecked: false });

    const element: HTMLElement | null = container.querySelector(".checkbox");

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass("isChecked");
  });

  it("renders img checkboxIcon", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".checkboxIcon");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("src", CHECK_ICON_SRC);
    expect(element).toHaveAttribute("alt", CHECKBOX_ICON_ALT_TEXT);
    expect(element).toHaveAttribute("aria-hidden", "true");
  });

  it("renders img checkboxIcon with passed prop isChecked = true", (): void => {
    const { container } = setup({ isChecked: true });

    const element: HTMLElement | null =
      container.querySelector(".checkboxIcon");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("isChecked");
  });

  it("does not render img checkboxIcon with passed prop isChecked = false", (): void => {
    const { container } = setup({ isChecked: false });

    const element: HTMLElement | null =
      container.querySelector(".checkboxIcon");

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass("isChecked");
  });
});
