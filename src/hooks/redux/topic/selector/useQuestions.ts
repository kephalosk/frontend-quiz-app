import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";

const useQuestions: () => EPQuestion[] = (): EPQuestion[] => {
  return useSelector((state: RootState): EPQuestion[] => state.topic.questions);
};

export default useQuestions;
