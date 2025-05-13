import { ReactElement } from "react";
import useSecurityLevel from "@/hooks/redux/securityLevel/useSecurityLevel.ts";
import { render, screen } from "@testing-library/react";
import useSecurityLabel from "@/hooks/password/useSecurityLabel.ts";
import StrengthContainer from "@/components/container/StrengthContainer/StrengthContainer.tsx";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import { SecurityLabelEnum } from "@/globals/models/enums/SecurityLabelEnum.ts";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import Label from "@/components/atoms/Label/Label.tsx";
import BeamContainer from "@/components/container/BeamContainer/BeamContainer.tsx";
import { STRENGTH_LABEL } from "@/globals/constants/Constants.ts";

const labelTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <div data-testid={labelTestId} className={props.type}>
          {props.text}
        </div>
      );
    }),
);

const beamContainerTestId: string = "beam-container";
jest.mock(
  "@/components/container/BeamContainer/BeamContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={beamContainerTestId}></div>;
    }),
);

jest.mock(
  "@/hooks/redux/securityLevel/useSecurityLevel.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/password/useSecurityLabel.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("StrengthContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    const { container } = render(<StrengthContainer />);
    return { container };
  };

  const securityLevel: SecurityLevelEnum = SecurityLevelEnum.STRONG;
  const useSecurityLevelMock: {
    securityLevel: SecurityLevelEnum;
  } = {
    securityLevel,
  };

  const securityLabel: SecurityLabelEnum = SecurityLabelEnum.STRONG;
  const useSecurityLabelMock: {
    securityLabel: SecurityLabelEnum;
  } = {
    securityLabel,
  };

  beforeEach((): void => {
    (useSecurityLevel as jest.Mock).mockReturnValue(useSecurityLevelMock);
    (useSecurityLabel as jest.Mock).mockReturnValue(useSecurityLabelMock);
  });

  it("renders div strengthContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".strengthContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders span strengthContainerSpace", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".strengthContainerSpace",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label for Strength title", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.UPPERCASE_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      1,
      { text: STRENGTH_LABEL, type: LabelTypeEnum.UPPERCASE_LABEL },
      undefined,
    );
  });

  it("renders component Label for beams", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.BEAM_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      2,
      { text: securityLabel, type: LabelTypeEnum.BEAM_LABEL },
      undefined,
    );
  });

  it("renders component BeamContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(beamContainerTestId);

    expect(element).toBeInTheDocument();
    expect(BeamContainer).toHaveBeenCalledTimes(1);
    expect(BeamContainer).toHaveBeenCalledWith(
      { securityLevel: SecurityLevelEnum.STRONG },
      undefined,
    );
  });

  it("calls hook useSecurityLevel", (): void => {
    setup();

    expect(useSecurityLevel).toHaveBeenCalledTimes(1);
    expect(useSecurityLevel).toHaveBeenCalledWith();
  });

  it("calls hook useSecurityLabel", (): void => {
    setup();

    expect(useSecurityLabel).toHaveBeenCalledTimes(1);
    expect(useSecurityLabel).toHaveBeenCalledWith(securityLevel);
  });
});
