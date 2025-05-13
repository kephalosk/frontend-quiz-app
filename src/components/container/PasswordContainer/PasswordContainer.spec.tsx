import Label from "@/components/atoms/Label/Label.tsx";
import { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";
import PasswordContainer, {
  PasswordContainerProps,
} from "@/components/container/PasswordContainer/PasswordContainer.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { COPY_ICON_D, COPY_ICON_SRC } from "@/globals/constants/Ressources.ts";
import {
  COPY_ICON_ALT_TEXT,
  COPY_TEXT,
} from "@/globals/constants/Constants.ts";
import usePasswordCopy from "@/hooks/password/usePasswordCopy.ts";
import useCopyStatus from "@/hooks/password/useCopyStatus.ts";
import useBlurOnPointerUp from "@/hooks/button/useBlurOnPointerUp.ts";
import useKeyClickBypass from "@/hooks/button/useKeyClickBypass.ts";
import { PasswordCopyHook } from "@/globals/models/types/PasswordCopyTypes.ts";
import { KeyClickBypassHook } from "@/globals/models/types/KeyClickBypassTypes.ts";
import { ReactNamesEnum } from "@/globals/models/enums/ReactNamesEnum.ts";

jest.mock(
  "@/hooks/password/usePasswordCopy.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/password/useCopyStatus.ts",
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

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={labelDataTestId} className={props.type}></div>;
    }),
);

describe("PasswordContainer component", (): void => {
  const password: string = "password";

  const setup = (
    propsOverride?: Partial<PasswordContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: PasswordContainerProps = {
      password,
    };

    const props: PasswordContainerProps = { ...defaultProps, ...propsOverride };
    return render(<PasswordContainer {...props} />);
  };

  const isCopiedMock: boolean = false;
  const setIsCopiedMock: jest.Mock = jest.fn();
  const handleButtonClickMock: jest.Mock = jest.fn();
  const usePasswordCopyMock: PasswordCopyHook = {
    isCopied: isCopiedMock,
    setIsCopied: setIsCopiedMock,
    handleButtonClick: handleButtonClickMock,
  };

  const handlePointerUpMock: jest.Mock = jest.fn();

  const handleClickMock: jest.Mock = jest.fn();
  const handleKeyDownMock: jest.Mock = jest.fn();
  const useKeyClickBypassMock: KeyClickBypassHook = {
    handleClick: handleClickMock,
    handleKeyDown: handleKeyDownMock,
  };

  beforeEach((): void => {
    (usePasswordCopy as jest.Mock).mockReturnValue(usePasswordCopyMock);
    (useCopyStatus as jest.Mock).mockReturnValue(undefined);
    (useBlurOnPointerUp as jest.Mock).mockReturnValue(handlePointerUpMock);
    (useKeyClickBypass as jest.Mock).mockReturnValue(useKeyClickBypassMock);
  });

  it("renders div passwordContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".passwordContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders div passwordContainerSpaceWrapper", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerSpaceWrapper",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders span passwordContainerSpace", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerSpace",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label for password", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.PASSWORD_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(1);
    expect(Label).toHaveBeenNthCalledWith(
      1,
      { text: password, type: LabelTypeEnum.PASSWORD_LABEL },
      undefined,
    );
  });

  it("renders div passwordContainerSpaceCopy", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerSpaceCopy",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label for copy", (): void => {
    (usePasswordCopy as jest.Mock).mockReturnValue({
      ...usePasswordCopyMock,
      isCopied: true,
    });
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.COPY_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      2,
      { text: COPY_TEXT, type: LabelTypeEnum.COPY_LABEL },
      undefined,
    );
  });

  it("does not render component Label for copy when isCopied is false", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.COPY_LABEL}`,
    );

    expect(element).not.toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(1);
  });

  it("renders div passwordContainerIconWrapper", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerIconWrapper",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("role", "button");
    expect(element).toHaveAttribute("aria-label", COPY_ICON_ALT_TEXT);
    expect(element).toHaveAttribute("aria-hidden", "false");
    expect(element).toHaveAttribute("tabIndex", "0");
  });

  it("calls handleClick when passwordContainerIconWrapper is clicked", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerIconWrapper",
    );
    fireEvent.click(element!);

    expect(element).toBeInTheDocument();
    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: ReactNamesEnum.ON_CLICK }),
    );
  });

  it("calls handleKeyDown when passwordContainerIconWrapper is keydowned", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerIconWrapper",
    );
    fireEvent.keyDown(element!);

    expect(element).toBeInTheDocument();
    expect(handleKeyDownMock).toHaveBeenCalledTimes(1);
    expect(handleKeyDownMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: ReactNamesEnum.ON_KEY_DOWN }),
    );
  });

  it("calls handlePointerUp when passwordContainerIconWrapper is mousedowned", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerIconWrapper",
    );
    fireEvent.mouseDown(element!);

    expect(element).toBeInTheDocument();
    expect(handlePointerUpMock).toHaveBeenCalledTimes(1);
    expect(handlePointerUpMock).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: ReactNamesEnum.ON_MOUSE_DOWN }),
    );
  });

  it("renders svg passwordContainerIcon", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerIcon",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("xmlns", COPY_ICON_SRC);
  });

  it("renders path passwordContainerIconPath", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerIconPath",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("d", COPY_ICON_D);
  });

  it("calls hook usePasswordCopy", (): void => {
    setup();

    expect(usePasswordCopy).toHaveBeenCalledTimes(1);
    expect(usePasswordCopy).toHaveBeenCalledWith(password);
  });

  it("calls hook useCopyStatus", (): void => {
    setup();

    expect(useCopyStatus).toHaveBeenCalledTimes(1);
    expect(useCopyStatus).toHaveBeenCalledWith(password, setIsCopiedMock);
  });

  it("calls hook useBlurOnPointerUp", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerIconWrapper",
    );

    expect(useBlurOnPointerUp).toHaveBeenCalledTimes(1);
    expect(useBlurOnPointerUp).toHaveBeenCalledWith({
      current: element,
    });
  });

  it("calls hook useKeyClickBypass", (): void => {
    setup();

    expect(useKeyClickBypass).toHaveBeenCalledTimes(1);
    expect(useKeyClickBypass).toHaveBeenCalledWith(handleButtonClickMock);
  });
});
