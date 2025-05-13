import Label, { LabelProps } from "./Label";
import { render } from "@testing-library/react";
import useWarnIfEmptyText from "@/hooks/label/useWarnIfEmptyText.ts";
import useLabelType from "@/hooks/label/useLabelType.ts";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";

jest.mock(
  "@/hooks/label/useLabelType.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/label/useWarnIfEmptyText.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("Label Component", (): void => {
  const type: LabelTypeEnum = LabelTypeEnum.PASSWORD_LABEL;
  const text: string = "test";

  const setup = (propsOverride?: Partial<LabelProps>) => {
    const defaultProps: LabelProps = {
      type,
      text,
    };

    const props: LabelProps = {
      ...defaultProps,
      ...propsOverride,
    };
    return render(<Label {...props} />);
  };

  const ariaLabel: string = "test";
  const renderedText: string = "test";
  const useLabelTypeMock = {
    ariaLabel,
    renderedText,
  };

  beforeEach((): void => {
    (useLabelType as jest.Mock).mockReturnValue(useLabelTypeMock);
    (useWarnIfEmptyText as jest.Mock).mockReturnValue(undefined);
  });

  it("renders the label with passed props type and text", (): void => {
    const { container } = setup({ text });

    const element: HTMLElement | null = container.querySelector(".label");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(type);
    expect(element).toHaveTextContent(renderedText);
    expect(element).toHaveAttribute("aria-label", ariaLabel);
  });

  it("sets the default text if prop text is undefined", (): void => {
    setup({ text: undefined });

    expect(useLabelType).toHaveBeenCalledWith(type, EMPTY_STRING);
    expect(useWarnIfEmptyText).toHaveBeenCalledWith(EMPTY_STRING);
  });

  it("sets the default type if prop type is undefined", (): void => {
    setup({ type: undefined });

    expect(useLabelType).toHaveBeenCalledWith(LabelTypeEnum.LABEL, text);
    expect(useWarnIfEmptyText).toHaveBeenCalledWith(text);
  });

  it("calls hook useLabelType", (): void => {
    setup();

    expect(useLabelType).toHaveBeenCalledTimes(1);
    expect(useLabelType).toHaveBeenCalledWith(type, text);
  });

  it("calls hook useWarnIfEmptyText", (): void => {
    setup();

    expect(useWarnIfEmptyText).toHaveBeenCalledTimes(1);
    expect(useWarnIfEmptyText).toHaveBeenCalledWith(text);
  });
});
