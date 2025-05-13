import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";

export const selectSecurityLevel = (state: RootState) =>
  state.securityLevel.value;

const useSecurityLevel = (): {
  securityLevel: SecurityLevelEnum;
} => {
  return { securityLevel: useSelector(selectSecurityLevel) };
};

export default useSecurityLevel;
