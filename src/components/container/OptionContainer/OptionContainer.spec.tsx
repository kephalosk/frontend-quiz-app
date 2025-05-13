import CheckboxContainer from "@/components/container/CheckboxContainer/CheckboxContainer.tsx";
import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import { ReactElement } from "react";
import useCurrentOptions from "@/hooks/redux/options/useCurrentOptions.ts";
import { fireEvent, render, screen } from "@testing-library/react";
import OptionContainer from "@/components/container/OptionContainer/OptionContainer.tsx";
import useSettingOption from "@/hooks/redux/options/useSettingOption.ts";

const checkboxContainerDataTestId: string = "checkbox-container";
jest.mock(
  "@/components/container/CheckboxContainer/CheckboxContainer.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <div
          data-testid={checkboxContainerDataTestId}
          onClick={props.handleOptionClick}
        ></div>
      );
    }),
);

jest.mock(
  "@/hooks/redux/options/useCurrentOptions.ts",
  (): { __esModule: boolean; default: jest.Mock } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/options/useSettingOption.ts",
  (): { __esModule: boolean; default: jest.Mock } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("OptionContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<OptionContainer />);
  };

  const useCurrentOptionsMock: { currentOptions: OptionItem[] } = {
    currentOptions: OptionItems,
  };

  const useSettingOptionMock: { settingOption: jest.Mock } = {
    settingOption: jest.fn(),
  };

  beforeEach((): void => {
    (useCurrentOptions as jest.Mock).mockReturnValue(useCurrentOptionsMock);
    (useSettingOption as jest.Mock).mockReturnValue(useSettingOptionMock);
  });

  it("renders div optionContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".optionContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders components CheckboxContainer", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      checkboxContainerDataTestId,
    );

    expect(elements).toHaveLength(OptionItems.length);
    expect(CheckboxContainer).toHaveBeenCalledTimes(OptionItems.length);
    OptionItems.forEach((option: OptionItem, index: number): void => {
      expect(CheckboxContainer).toHaveBeenNthCalledWith(
        index + 1,
        {
          option: option.option,
          isChecked: option.isChecked,
          handleOptionClick: expect.any(Function),
        },
        undefined,
      );
    });
  });

  it("calls hook useCurrentOptions", (): void => {
    setup();

    expect(useCurrentOptions).toHaveBeenCalledTimes(1);
    expect(useCurrentOptions).toHaveBeenCalledWith();
  });

  it("calls hook useSettingOption", (): void => {
    setup();

    expect(useSettingOption).toHaveBeenCalledTimes(1);
    expect(useSettingOption).toHaveBeenCalledWith();
  });

  it("calls settingOption when a CheckBoxContainer is clicked", (): void => {
    const settingOptionMock: jest.Mock = jest.fn();
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      checkboxContainerDataTestId,
    );
    const firstElement: HTMLElement = elements.at(0)!;
    firstElement.onclick = settingOptionMock;
    fireEvent.click(firstElement);

    expect(settingOptionMock).toHaveBeenCalledTimes(1);
    expect(settingOptionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "click",
      }),
    );
  });
});
