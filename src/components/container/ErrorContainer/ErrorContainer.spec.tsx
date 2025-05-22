import { render, screen } from "@testing-library/react";
import ErrorContainer from "@/components/container/ErrorContainer/ErrorContainer.tsx";
import {
  ERROR_ICON_D,
  ERROR_ICON_SRC_WEB,
} from "@/globals/constants/Ressources.ts";
import Label from "@/components/atoms/Label/Label.tsx";
import { ReactElement } from "react";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { MISSING_SELECTION_ERROR_MESSAGE } from "@/globals/constants/ErrorMessages.ts";

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={labelDataTestId}></div>;
    }),
);

describe("ErrorContainer", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<ErrorContainer />);
  };

  it("renders div errorContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".errorContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders svg errorContainerIcon", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".errorContainerIcon",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("xmlns", ERROR_ICON_SRC_WEB);
    expect(element).toHaveAttribute("viewBox", "0 0 40 40");
  });

  it("renders path errorContainerIconPath", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".errorContainerIconPath",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("d", ERROR_ICON_D);
  });

  it("renders component Label", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(labelDataTestId);

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(1);
    expect(Label).toHaveBeenCalledWith(
      {
        type: LabelTypeEnum.ERROR_LABEL,
        text: MISSING_SELECTION_ERROR_MESSAGE,
      },
      undefined,
    );
  });
});
