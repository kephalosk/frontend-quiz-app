import { fireEvent, render } from "@testing-library/react";
import Button, { ButtonProps } from "./Button.tsx";
import {
  ARROW_RIGHT_ICON_ALT_TEXT,
  BUTTON_ARIA_LABEL_PREFIX,
} from "@/globals/constants/Constants.ts";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import {
  ARROW_RIGHT_ICON_D,
  ARROW_RIGHT_ICON_SRC,
} from "@/globals/constants/Ressources.ts";

jest.mock(
  "@/hooks/button/useKeyClickBypass.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/button/useBlurOnPointerUp.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("Button", (): void => {
  const text: string = "reset";
  const handleButtonClickMock: jest.Mock = jest.fn();
  const isDisabled: boolean = false;

  const isDisabledDefault: boolean = false;

  const setup = (
    propsOverride?: Partial<ButtonProps>,
  ): { container: HTMLElement } => {
    const defaultProps: ButtonProps = {
      text,
      handleButtonClick: handleButtonClickMock,
      isDisabled: isDisabled,
    };

    const props: ButtonProps = { ...defaultProps, ...propsOverride };

    return render(<Button {...props} />);
  };

  const handleClickMock: jest.Mock = jest.fn();
  const handleKeyDownMock: jest.Mock = jest.fn();
  const useKeyClickBypassMock = {
    handleClick: handleClickMock,
    handleKeyDown: handleKeyDownMock,
  };

  const handlePointerUpMock: jest.Mock = jest.fn();

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  beforeEach((): void => {
    (useKeyClickBypass as jest.Mock).mockReturnValue(useKeyClickBypassMock);
    (useBlurOnPointerUp as jest.Mock).mockReturnValue(handlePointerUpMock);

    handleButtonClickMock.mockClear();
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("renders the button with the passed text", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("aria-disabled", `${isDisabled}`);
    expect(element).toHaveAttribute(
      "aria-label",
      `${BUTTON_ARIA_LABEL_PREFIX}${text}`,
    );
    expect(element).toHaveAttribute("tabindex", "0");
    expect(element).toHaveAttribute("type", "button");
  });

  it("renders span buttonText", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".buttonText");

    expect(element).toHaveTextContent(text);
  });

  it("renders svg buttonIcon", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".buttonIcon");

    expect(element).toHaveAttribute(
      "aria-label",
      `${ARROW_RIGHT_ICON_ALT_TEXT}`,
    );
    expect(element).toHaveAttribute("aria-hidden", "true");
    expect(element).toHaveAttribute("xmlns", `${ARROW_RIGHT_ICON_SRC}`);
  });

  it("renders path buttonIconPath", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".buttonIconPath");

    expect(element).toHaveAttribute("d", `${ARROW_RIGHT_ICON_D}`);
  });

  it("calls handleClick on click", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("does not call handleClick on click if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(handleClickMock).toHaveBeenCalledTimes(0);
  });

  it("sets class disabled if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toHaveClass("disabled");
  });

  it("calls handleKeyDown on key down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.keyDown(element!);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
    expect(handleKeyDownMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("does not call handleKeyDown on click if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(0);
  });

  it("calls handlePointerUp on mouse down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.mouseDown(element!);

    expect(handlePointerUpMock).toHaveBeenCalledTimes(1);
    expect(handlePointerUpMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("does not call handlePointerUp on click if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");
    fireEvent.click(element!);

    expect(handlePointerUpMock).toHaveBeenCalledTimes(0);
  });

  it("sets tabIndex to -1 if prop isDisabled is true", (): void => {
    const { container } = setup({ isDisabled: true });

    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toHaveAttribute("tabindex", "-1");
  });

  it("sets default value for prop isDisabled if it is undefined", (): void => {
    const { container } = setup({ isDisabled: undefined });
    const element: HTMLElement | null = container.querySelector(".button");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("aria-disabled", `${isDisabledDefault}`);
  });

  it("calls hook useKeyClickBypass", (): void => {
    setup({ handleButtonClick: handleButtonClickMock });

    expect(useKeyClickBypass).toHaveBeenCalledTimes(1);
    expect(useKeyClickBypass).toHaveBeenCalledWith(handleButtonClickMock);
  });

  it("calls hook useBlurOnPointerUp", (): void => {
    setup();

    expect(useBlurOnPointerUp).toHaveBeenCalledTimes(1);
    expect(useBlurOnPointerUp).toHaveBeenCalledWith(expect.any(Object));
  });
});
