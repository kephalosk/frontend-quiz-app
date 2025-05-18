import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import TitleContainer, {
  TitleContainerProps,
} from "@/components/container/TitleContainer/TitleContainer.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import Headline from "@/components/atoms/Headline/Headline.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={labelDataTestId}></div>;
    }),
);

const headlineDataTestId: string = "headline";
jest.mock(
  "@/components/atoms/Headline/Headline.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={headlineDataTestId}></div>;
    }),
);

describe("TitleContainer Component", (): void => {
  const firstLine: string = "test";
  const headline: string = "title";
  const subLine: string = "subtitle";
  const setup = (
    propsOverride?: Partial<TitleContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: TitleContainerProps = {
      firstLine,
      headline,
      subLine,
    };

    const props: TitleContainerProps = { ...defaultProps, ...propsOverride };
    return render(<TitleContainer {...props} />);
  };

  it(`renders div titleContainer`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".titleContainer");

    expect(element).toBeInTheDocument();
  });

  it(`renders div titleContainerHeader`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".titleContainerHeader",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label for HEADLINE_LABEL", (): void => {
    setup();

    const element: HTMLElement[] = screen.getAllByTestId(labelDataTestId);

    expect(element).toHaveLength(2);
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      1,
      {
        type: LabelTypeEnum.HEADLINE_LABEL,
        text: firstLine,
      },
      undefined,
    );
  });

  it("renders component Headline", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(headlineDataTestId);

    expect(element).toBeInTheDocument();
    expect(Headline).toHaveBeenCalledTimes(1);
    expect(Headline).toHaveBeenCalledWith(
      {
        title: headline,
      },
      undefined,
    );
  });

  it("renders component Label for SUB_LINE_LABEL", (): void => {
    setup();

    const element: HTMLElement[] = screen.getAllByTestId(labelDataTestId);

    expect(element).toHaveLength(2);
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      2,
      {
        type: LabelTypeEnum.SUB_LINE_LABEL,
        text: subLine,
      },
      undefined,
    );
  });
});
