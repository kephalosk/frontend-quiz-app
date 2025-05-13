import { render, screen } from "@testing-library/react";
import BeamContainer, {
  BeamContainerProps,
} from "@/components/container/BeamContainer/BeamContainer.tsx";
import Beam from "@/components/atoms/Beam/Beam.tsx";
import { ReactElement } from "react";
import { BeamItem, BeamItems } from "@/globals/constants/BeamItems.ts";
import { BeamColorEnum } from "@/globals/models/enums/BeamColorEnum.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import useMarkedBeams from "@/hooks/beam/useMarkedBeams.ts";

const beamDataTestId: string = "beam";
jest.mock(
  "@/components/atoms/Beam/Beam.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={beamDataTestId}></div>;
    }),
);

jest.mock(
  "@/hooks/beam/useMarkedBeams.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("BeamContainer Component", (): void => {
  const securityLevel: SecurityLevelEnum = SecurityLevelEnum.MEDIUM;

  const setup = (
    propsOverride?: Partial<BeamContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: BeamContainerProps = {
      securityLevel,
    };

    const props: BeamContainerProps = { ...defaultProps, ...propsOverride };
    return render(<BeamContainer {...props} />);
  };

  const useMarkedBeamsMock: { beams: BeamItem[] } = {
    beams: BeamItems,
  };

  beforeEach((): void => {
    (useMarkedBeams as jest.Mock).mockReturnValue(useMarkedBeamsMock);
  });

  it("renders div beamContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".beamContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders components Beams", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(beamDataTestId);

    expect(elements).toHaveLength(BeamItems.length);
    BeamItems.forEach((beam: BeamItem): void => {
      expect(Beam).toHaveBeenNthCalledWith(
        beam.index,
        { color: BeamColorEnum.TRANSPARENT },
        undefined,
      );
    });
  });

  it("calls hook useMarkedBeams", (): void => {
    setup();

    expect(useMarkedBeams).toHaveBeenCalledTimes(1);
    expect(useMarkedBeams).toHaveBeenCalledWith(SecurityLevelEnum.MEDIUM);
  });
});
