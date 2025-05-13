import { ReactElement } from "react";
import { render } from "@testing-library/react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { SLIDER_HEADER_LABEL_TEXT } from "@/globals/constants/Constants.ts";
import SliderHeaderContainer from "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx";
import useCharacterLength from "@/hooks/redux/characterLength/useCharacterLength.ts";

const characterLengthMock: number = 10;
jest.mock(
  "@/hooks/redux/characterLength/useCharacterLength.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn((): number => characterLengthMock),
  }),
);

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={labelDataTestId} className={props.type}></div>;
    }),
);

describe("SliderHeaderContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<SliderHeaderContainer />);
  };

  it("renders div sliderHeaderContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderHeaderContainer",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders span sliderHeaderContainerSpace", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderHeaderContainerSpace",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label for header", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.HEADER_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      1,
      {
        type: LabelTypeEnum.HEADER_LABEL,
        text: SLIDER_HEADER_LABEL_TEXT,
      },
      undefined,
    );
  });

  it("renders component Label for number", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.NUMBER_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      2,
      {
        type: LabelTypeEnum.NUMBER_LABEL,
        text: characterLengthMock.toString(),
      },
      undefined,
    );
  });

  it("calls hook useCharacterLength", (): void => {
    setup();

    expect(useCharacterLength).toHaveBeenCalledTimes(1);
    expect(useCharacterLength).toHaveBeenCalledWith();
  });
});
