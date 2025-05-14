import SwitchButton, {
  SwitchButtonProps,
} from "@/components/atoms/SwitchButton/SwitchButton.tsx";
import { fireEvent, render } from "@testing-library/react";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import { SWITCH_BUTTON_ARIA_LABEL_PREFIX } from "@/globals/constants/Constants.ts";

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

describe("SwitchButton component", (): void => {
  const isActive: boolean = false;
  const handleButtonClickMock: jest.Mock = jest.fn();

  const setup = (
    propsOverride?: Partial<SwitchButtonProps>,
  ): { container: HTMLElement } => {
    const defaultProps: SwitchButtonProps = {
      isActive,
      handleButtonClick: handleButtonClickMock,
    };

    const props: SwitchButtonProps = { ...defaultProps, ...propsOverride };
    return render(<SwitchButton {...props} />);
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

  it("renders button switchButton", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".switchButton");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute(
      "aria-label",
      `${SWITCH_BUTTON_ARIA_LABEL_PREFIX}${isActive}`,
    );
  });

  it("renders div switchButtonAdjuster", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".switchButtonAdjuster",
    );

    expect(element).toBeInTheDocument();
  });

  it("sets class switchButtonAdjuster--active in div switchButtonAdjuster when passed prop isActive === true", (): void => {
    const { container } = setup({ isActive: true });

    const element: HTMLElement | null = container.querySelector(
      ".switchButtonAdjuster",
    );

    expect(element).toHaveClass("switchButtonAdjuster--active");
  });

  it("does not set class switchButtonAdjuster--active in div switchButtonAdjuster when passed prop isActive === false", (): void => {
    const { container } = setup({ isActive: false });

    const element: HTMLElement | null = container.querySelector(
      ".switchButtonAdjuster",
    );

    expect(element).not.toHaveClass("switchButtonAdjuster--active");
  });

  it("calls handleClick on click", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".switchButton");
    fireEvent.click(element!);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls handleKeyDown on key down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".switchButton");
    fireEvent.keyDown(element!);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
    expect(handleKeyDownMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls handlePointerUp on mouse down", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".switchButton");
    fireEvent.mouseDown(element!);

    expect(handlePointerUpMock).toHaveBeenCalledTimes(1);
    expect(handlePointerUpMock).toHaveBeenCalledWith(expect.any(Object));
  });
});
