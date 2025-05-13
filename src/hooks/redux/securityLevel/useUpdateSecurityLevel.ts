import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setSecurityLevelValue } from "@/redux/slices/securityLevelSlice.ts";

const useUpdateSecurityLevel = (): ((newValue: number) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: number): void => {
    dispatch(setSecurityLevelValue(newValue));
  };
};

export default useUpdateSecurityLevel;
