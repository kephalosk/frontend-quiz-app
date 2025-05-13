import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const useCharacterLength = (): number => {
  return useSelector((state: RootState): number => state.characterLength.value);
};

export default useCharacterLength;
