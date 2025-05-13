import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import useSecurityLevel, {
  selectSecurityLevel,
} from "@/hooks/redux/securityLevel/useSecurityLevel.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";

jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock;
    useSelector: jest.Mock;
  } => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }),
);

describe("useSecurityLevel Hook", (): void => {
  const characterLength: number = 10;
  const value: number = SecurityLevelEnum.STRONG;

  const mockState: RootState = {
    characterLength: { value: characterLength },
    securityLevel: { value },
    options: {
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState),
    );
  });

  const securityLevelTestId: string = "security-level";
  const TestComponent = () => {
    const { securityLevel } = useSecurityLevel();
    return (
      <div>
        <div data-testid={securityLevelTestId}>{securityLevel.toString()}</div>
      </div>
    );
  };

  it("returns securityLevel correctly", (): void => {
    render(<TestComponent />);

    const element: HTMLElement = screen.getByTestId(securityLevelTestId);

    expect(element).toHaveTextContent(value.toString());
  });

  it("calls securityLevelValue and returns the correct securityLevel value from the store", (): void => {
    const state: RootState = {
      ...mockState,
      securityLevel: { value },
    };

    const securityLevel: number = selectSecurityLevel(state);

    expect(securityLevel).toBe(value);
  });
});
