import securityLevelReducer, {
  SecurityLevelState,
  setSecurityLevelValue,
} from "./securityLevelSlice.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";

describe("securityLevelSlice", (): void => {
  const initialState: { value: number } = { value: SecurityLevelEnum.NONE };

  it("returns the initial state", (): void => {
    expect(securityLevelReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handles setting the securityLevel value", (): void => {
    const newValue: SecurityLevelEnum = SecurityLevelEnum.MEDIUM;
    const action: {
      payload: number;
      type: "securityLevel/setSecurityLevelValue";
    } = setSecurityLevelValue(newValue);
    const nextState: SecurityLevelState = securityLevelReducer(
      initialState,
      action,
    );

    expect(nextState.value).toEqual(newValue);
  });

  it("handles updating the securityLevel value multiple times", (): void => {
    const action1: {
      payload: number;
      type: "securityLevel/setSecurityLevelValue";
    } = setSecurityLevelValue(SecurityLevelEnum.LOW);
    const state1: SecurityLevelState = securityLevelReducer(
      initialState,
      action1,
    );
    const action2: {
      payload: number;
      type: "securityLevel/setSecurityLevelValue";
    } = setSecurityLevelValue(SecurityLevelEnum.STRONG);
    const state2: SecurityLevelState = securityLevelReducer(state1, action2);

    expect(state1.value).toEqual(SecurityLevelEnum.LOW);
    expect(state2.value).toEqual(SecurityLevelEnum.STRONG);
  });
});
