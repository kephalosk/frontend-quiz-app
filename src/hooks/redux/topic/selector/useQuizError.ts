import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const useQuizError: () => string | null = (): string | null => {
  return useSelector(
    (state: RootState): string | null => state.topic.quizError,
  );
};

export default useQuizError;
