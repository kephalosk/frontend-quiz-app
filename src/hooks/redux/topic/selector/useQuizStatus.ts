import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";

const useQuizStatus: () => LoadingStateEnum = (): LoadingStateEnum => {
  return useSelector(
    (state: RootState): LoadingStateEnum => state.topic.quizStatus,
  );
};

export default useQuizStatus;
