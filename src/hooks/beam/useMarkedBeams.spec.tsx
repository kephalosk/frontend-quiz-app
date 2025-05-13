import React, { ReactElement } from "react";
import { BeamItem } from "@/globals/constants/BeamItems.ts";
import useMarkedBeams from "@/hooks/beam/useMarkedBeams.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import { render, screen } from "@testing-library/react";
import { BeamColorEnum } from "@/globals/models/enums/BeamColorEnum.ts";

interface TestComponentProps {
  securityLevel: SecurityLevelEnum;
}

const beamDataTestId: string = "test-component";
const TestComponent: React.FC<TestComponentProps> = ({
  securityLevel,
}: TestComponentProps): ReactElement => {
  const { beams } = useMarkedBeams(securityLevel);

  return (
    <>
      {beams.map((beam: BeamItem) => (
        <div
          key={beam.index}
          className={beam.color}
          data-testid={beamDataTestId}
        ></div>
      ))}
    </>
  );
};

describe("useMarkedBeams hook", (): void => {
  const setup = (propsOverride?: Partial<TestComponentProps>) => {
    const defaultProps: TestComponentProps = {
      securityLevel: SecurityLevelEnum.WEAK,
    };

    const props: TestComponentProps = { ...defaultProps, ...propsOverride };
    return render(<TestComponent {...props} />);
  };

  it.each([
    [SecurityLevelEnum.NONE, BeamColorEnum.TRANSPARENT],
    [SecurityLevelEnum.WEAK, BeamColorEnum.RED],
    [SecurityLevelEnum.LOW, BeamColorEnum.ORANGE],
    [SecurityLevelEnum.MEDIUM, BeamColorEnum.YELLOW],
    [SecurityLevelEnum.STRONG, BeamColorEnum.GREEN],
  ])(
    "returns marked Beams for SecurityLevel %s",
    (securityLevel: SecurityLevelEnum, color: BeamColorEnum): void => {
      setup({ securityLevel });

      const elements: HTMLElement[] = screen.getAllByTestId(beamDataTestId);

      elements.forEach((element: HTMLElement, index: number): void => {
        if (index < securityLevel) {
          expect(element).toHaveClass(color);
        } else {
          expect(element).toHaveClass(BeamColorEnum.TRANSPARENT);
        }
      });
    },
  );
});
