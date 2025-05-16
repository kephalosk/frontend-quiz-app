import SliderContainer from "@/components/container/SliderContainer/SliderContainer.tsx";
import OptionContainer from "@/components/container/OptionContainer/OptionContainer.tsx";
import StrengthContainer from "@/components/container/StrengthContainer/StrengthContainer.tsx";
import SubmitButton from "@/components/atoms/SubmitButton/SubmitButton.tsx";
import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import ContentContainer, {
  ContentContainerProps,
} from "@/components/container/ContentContainer/ContentContainer.tsx";
import { BUTTON_TEXT } from "@/globals/constants/Constants.ts";
import usePasswordProcessing from "@/hooks/password/usePasswordProcessing.ts";
import { PasswordProcessingHook } from "@/globals/models/types/PasswordProcessingTypes.ts";

const sliderContainerDataTestId: string = "slider-container";
jest.mock(
  "@/components/container/SliderContainer/SliderContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderContainerDataTestId}></div>;
    }),
);

const optionContainerDataTestId: string = "option-container";
jest.mock(
  "@/components/container/OptionContainer/OptionContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={optionContainerDataTestId}></div>;
    }),
);

const strengthContainerDataTestId: string = "strength-container";
jest.mock(
  "@/components/container/StrengthContainer/StrengthContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={strengthContainerDataTestId}></div>;
    }),
);

const buttonDataTestId: string = "button";
jest.mock(
  "@/components/atoms/SubmitButton/SubmitButton.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <div
          data-testid={buttonDataTestId}
          onClick={props.handleButtonClick}
        ></div>
      );
    }),
);

jest.mock(
  "@/hooks/password/usePasswordProcessing.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("ContentContainer Component", (): void => {
  const propagateValueMock: jest.Mock = jest.fn();

  const setup = (
    propsOverride?: Partial<ContentContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: ContentContainerProps = {
      propagateValue: propagateValueMock,
    };

    const props: ContentContainerProps = { ...defaultProps, ...propsOverride };
    return render(<ContentContainer {...props} />);
  };

  const handlePasswordGenerationMock: jest.Mock = jest.fn();
  const usePasswordProcessingMock: PasswordProcessingHook = {
    handlePasswordGeneration: handlePasswordGenerationMock,
  };

  beforeEach((): void => {
    (usePasswordProcessing as jest.Mock).mockReturnValue(
      usePasswordProcessingMock,
    );
  });

  it(`renders div contentContainer`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".contentContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component SliderContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderContainer).toHaveBeenCalledTimes(1);
    expect(SliderContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component OptionContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(optionContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(OptionContainer).toHaveBeenCalledTimes(1);
    expect(OptionContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component StrengthContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      strengthContainerDataTestId,
    );

    expect(element).toBeInTheDocument();
    expect(StrengthContainer).toHaveBeenCalledTimes(1);
    expect(StrengthContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component SubmitButton", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(buttonDataTestId);

    expect(element).toBeInTheDocument();
    expect(SubmitButton).toHaveBeenCalledTimes(1);
    expect(SubmitButton).toHaveBeenCalledWith(
      {
        handleButtonClick: expect.any(Function),
        text: BUTTON_TEXT,
      },
      undefined,
    );
  });

  it("calls hook usePasswordProcessing", (): void => {
    setup();

    expect(usePasswordProcessing).toHaveBeenCalledTimes(1);
    expect(usePasswordProcessing).toHaveBeenCalledWith(propagateValueMock);
  });
});
