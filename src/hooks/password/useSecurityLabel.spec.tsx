import { render, screen } from "@testing-library/react";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import useSecurityLabel from "@/hooks/password/useSecurityLabel.ts";
import React from "react";
import { SecurityLabelEnum } from "@/globals/models/enums/SecurityLabelEnum.ts";

describe("useSecurityLabel Hook", (): void => {
  interface TestComponentProps {
    securityLevel: SecurityLevelEnum;
  }

  const securityLabelTestId: string = "security-level";
  const TestComponent: React.FC<TestComponentProps> = ({
    securityLevel,
  }: TestComponentProps) => {
    const { securityLabel } = useSecurityLabel(securityLevel);
    return (
      <div>
        <div data-testid={securityLabelTestId}>{securityLabel}</div>
      </div>
    );
  };

  it.each([
    [SecurityLabelEnum.NONE, SecurityLevelEnum.NONE],
    [SecurityLabelEnum.WEAK, SecurityLevelEnum.WEAK],
    [SecurityLabelEnum.LOW, SecurityLevelEnum.LOW],
    [SecurityLabelEnum.MEDIUM, SecurityLevelEnum.MEDIUM],
    [SecurityLabelEnum.STRONG, SecurityLevelEnum.STRONG],
  ])(
    "returns securityLabel %s for securityLevel %s",
    (
      securityLabel: SecurityLabelEnum,
      securityLevel: SecurityLevelEnum,
    ): void => {
      render(<TestComponent securityLevel={securityLevel} />);

      const element: HTMLElement = screen.getByTestId(securityLabelTestId);

      expect(element).toHaveTextContent(securityLabel);
    },
  );
});
