import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const useCurrentIndex: () => number = (): number => {
  return useSelector((state: RootState): number => state.topic.currentIndex);
};

export default useCurrentIndex;
