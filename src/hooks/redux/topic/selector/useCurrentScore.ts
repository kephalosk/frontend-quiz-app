import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const useCurrentScore: () => number = (): number => {
  return useSelector((state: RootState): number => state.topic.currentScore);
};

export default useCurrentScore;
