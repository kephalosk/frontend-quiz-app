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

describe("Footer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<Footer />);
  };

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
});
