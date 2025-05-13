import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setCharacterLengthValue } from "@/redux/slices/characterLengthSlice.ts";

const useUpdateCharacterLength = (): ((newValue: number) => void) => {
  const dispatch: Dispatch = useDispatch();

  return (newValue: number): void => {
    dispatch(setCharacterLengthValue(newValue));
  };
};

export default useUpdateCharacterLength;
