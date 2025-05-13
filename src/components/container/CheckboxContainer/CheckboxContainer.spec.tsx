import { fireEvent, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import Checkbox from "@/components/atoms/Checkbox/Checkbox.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import { OptionEnum } from "@/globals/models/enums/OptionEnum.ts";
import CheckboxContainer, {
  CheckboxContainerProps,
} from "@/components/container/CheckboxContainer/CheckboxContainer.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import { KeyClickBypassHook } from "@/globals/models/types/KeyClickBypassTypes.ts";
import { ReactNamesEnum } from "@/globals/models/enums/ReactNamesEnum.ts";

const checkboxTestId: string = "checkbox";
jest.mock(
  "@/components/atoms/Checkbox/Checkbox.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={checkboxTestId}></div>;
    }),
);

const labelTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={labelTestId}></div>;
    }),
);

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

describe("CheckboxContainer Component", (): void => {
  const option: OptionEnum = OptionEnum.NUMBERS;
  const isChecked: boolean = false;
  const handleOptionClickMock: jest.Mock = jest.fn();

  const setup = (
    propsOverride?: Partial<CheckboxContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: CheckboxContainerProps = {
      option,
      isChecked,
      handleOptionClick: handleOptionClickMock,
    };

    const props: CheckboxContainerProps = { ...defaultProps, ...propsOverride };
    return render(<CheckboxContainer {...props} />);
  };

  const handlePointerUpMock: jest.Mock = jest.fn();

  const handleClickMock: jest.Mock = jest.fn();
  const handleKeyDownMock: jest.Mock = jest.fn();
  const useKeyClickBypassMock: KeyClickBypassHook = {
    handleClick: handleClickMock,
    handleKeyDown: handleKeyDownMock,
  };

  beforeEach((): void => {
    (useKeyClickBypass as jest.Mock).mockReturnValue(useKeyClickBypassMock);
    (useBlurOnPointerUp as jest.Mock).mockReturnValue(handlePointerUpMock);
  });

  it("renders div checkboxContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".checkboxContainer");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("tabIndex", "0");
  });

  it("calls handleClick on click in checkboxContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".checkboxContainer");
    fireEvent.click(element!);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: ReactNamesEnum.ON_CLICK }),
    );
  });

  it("calls handleKeyDown on key down in checkboxContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".checkboxContainer");
    fireEvent.keyDown(element!);

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
    expect(handleKeyDownMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: ReactNamesEnum.ON_KEY_DOWN }),
    );
  });

  it("calls handlePointerUp on mouse down in checkboxContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".checkboxContainer");
    fireEvent.mouseDown(element!);

    expect(handlePointerUpMock).toHaveBeenCalledTimes(1);
    expect(handlePointerUpMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: ReactNamesEnum.ON_MOUSE_DOWN }),
    );
  });

  it("renders component Checkbox with passed prop isChecked", (): void => {
    setup({ isChecked });

    const element: HTMLElement = screen.getByTestId(checkboxTestId);

    expect(element).toBeInTheDocument();
    expect(Checkbox).toHaveBeenCalledTimes(1);
    expect(Checkbox).toHaveBeenCalledWith({ isChecked }, undefined);
  });

  it("renders component Label with passed prop option", (): void => {
    setup({ option });

    const element: HTMLElement = screen.getByTestId(labelTestId);

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(1);
    expect(Label).toHaveBeenCalledWith(
      { text: option, type: LabelTypeEnum.CHECKBOX_LABEL },
      undefined,
    );
  });

  it("calls useKeyClickBypass", (): void => {
    setup();

    expect(useKeyClickBypass).toHaveBeenCalledTimes(1);
    expect(useKeyClickBypass).toHaveBeenCalledWith(handleOptionClickMock);
  });

  it("calls useBlurOnPointerUp", (): void => {
    setup();

    expect(useBlurOnPointerUp).toHaveBeenCalledTimes(1);
    expect(useBlurOnPointerUp).toHaveBeenCalledWith({
      current: expect.any(Object),
    });
  });
});
