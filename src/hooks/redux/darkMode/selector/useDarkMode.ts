import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const useDarkMode = (): boolean => {
  return useSelector((state: RootState): boolean => state.darkMode.value);
};

export default useDarkMode;
