import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const useIsQuizFinished: () => boolean = (): boolean => {
  return useSelector((state: RootState): boolean => state.topic.isQuizFinished);
};

export default useIsQuizFinished;
