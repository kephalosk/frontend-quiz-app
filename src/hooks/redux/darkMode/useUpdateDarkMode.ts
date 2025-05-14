import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setDarkModeValue } from "@/redux/slices/darkModeSlice.ts";

const useUpdateDarkMode = (): ((newValue: boolean) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: boolean): void => {
    dispatch(setDarkModeValue(newValue));
  };
};

export default useUpdateDarkMode;
