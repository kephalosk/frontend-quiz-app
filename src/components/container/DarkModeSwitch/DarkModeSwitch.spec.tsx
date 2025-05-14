import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import useDarkMode from "@/hooks/redux/darkMode/useDarkMode.ts";
import useUpdateDarkMode from "@/hooks/redux/darkMode/useUpdateDarkMode.ts";
import { ReactElement } from "react";
import SwitchButton from "@/components/atoms/SwitchButton/SwitchButton.tsx";
import DarkModeSwitch from "@/components/container/DarkModeSwitch/DarkModeSwitch.tsx";
import {
  MOON_ICON_D,
  SUN_ICON_D,
  SUN_ICON_SRC,
} from "@/globals/constants/Ressources.ts";

const switchButtonTestId: string = "switch-button";
jest.mock(
  "@/components/atoms/SwitchButton/SwitchButton.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <div
          data-testid={switchButtonTestId}
          onClick={() => props.handleButtonClick(true)}
        ></div>
      );
    }),
);

jest.mock(
  "@/hooks/redux/darkMode/useDarkMode.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/darkMode/useUpdateDarkMode.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("DarkModeSwitch Component", (): void => {
  const setup = () => {
    return render(<DarkModeSwitch />);
  };

  const useDarkModeMock: boolean = false;
  const useUpdateDarkModeMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDarkMode as jest.Mock).mockReturnValue(useDarkModeMock);
    (useUpdateDarkMode as jest.Mock).mockReturnValue(useUpdateDarkModeMock);
  });

  it("renders div label darkModeSwitch", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".darkModeSwitch");

    expect(element).toBeInTheDocument();
  });

  it("renders svg darkModeSwitchIcon__Sun", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".darkModeSwitchIcon__Sun",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("darkModeSwitchIcon");
    expect(element).toHaveAttribute("xmlns", SUN_ICON_SRC);
    expect(element).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it.each([
    ["Sun", SUN_ICON_D],
    ["Moon", MOON_ICON_D],
  ])(
    "renders path darkModeSwitchIconPath__%s with isActive === true",
    (iconType: string, path: string): void => {
      (useDarkMode as jest.Mock).mockReturnValue(true);
      const { container } = setup();

      const element: HTMLElement | null = container.querySelector(
        `.darkModeSwitchIconPath__${iconType}`,
      );

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("darkModeSwitchIconPath");
      expect(element).toHaveClass("darkModeSwitchIconPath--active");
      expect(element).toHaveAttribute("d", path);
    },
  );

  it("renders path darkModeSwitchIconPath__Sun with isActive === false", (): void => {
    (useDarkMode as jest.Mock).mockReturnValue(false);
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".darkModeSwitchIconPath__Sun",
    );

    expect(element).not.toHaveClass("darkModeSwitchIconPath--active");
  });

  it("renders component SwitchButton", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(switchButtonTestId);

    expect(element).toBeInTheDocument();
    expect(SwitchButton).toHaveBeenCalledTimes(1);
    expect(SwitchButton).toHaveBeenCalledWith(
      {
        isActive: useDarkModeMock,
        handleButtonClick: expect.any(Function),
      },
      undefined,
    );
  });

  it("calls useDarkMode when SwitchButton is clicked", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByTestId(switchButtonTestId);

    waitFor(() => fireEvent.click(element));

    expect(useUpdateDarkMode).toHaveBeenCalledTimes(1);
    expect(useUpdateDarkMode).toHaveBeenCalledWith();
  });

  it("calls hook useDarkMode", (): void => {
    setup();

    expect(useDarkMode).toHaveBeenCalledTimes(1);
    expect(useDarkMode).toHaveBeenCalledWith();
  });

  it("calls hook useUpdateDarkMode", (): void => {
    setup();

    expect(useUpdateDarkMode).toHaveBeenCalledTimes(1);
    expect(useUpdateDarkMode).toHaveBeenCalledWith();
  });
});
