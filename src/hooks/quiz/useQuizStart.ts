import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import useUpdateTopic from "@/hooks/redux/topic/dispatch/useUpdateTopic.ts";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { EPTopic } from "@/globals/models/entrypoints/EPTopic.ts";
import { getTopic } from "@/globals/services/TopicService.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import getEPQuestionsShuffledFromEPTopic from "@/globals/helper/getEPQuestionsShuffledFromEPTopic.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";
import {
  QUIZ_SUB_PATH,
  STARTPAGE_PATH,
} from "@/globals/constants/Ressources.ts";
import { QuizStartHook } from "@/globals/models/types/QuizTypes.ts";
import { FAILED_QUIZ_START_ERROR_MESSAGE_PREFIX } from "@/globals/constants/ErrorMessages.ts";
import useUpdateQuestionsAndResetIndexAndScore from "@/hooks/redux/topic/dispatch/useUpdateQuestionsAndResetIndexAndScore.ts";
import useUpdateQuizError from "@/hooks/redux/topic/dispatch/useUpdateQuizError.ts";

const useQuizStart: () => QuizStartHook = (): QuizStartHook => {
  const handleTopicUpdate: (newValue: TopicEnum) => void = useUpdateTopic();
  const navigate: NavigateFunction = useNavigate();
  const setQuestions: (newValue: EPQuestion[]) => void =
    useUpdateQuestionsAndResetIndexAndScore();
  const setError: (newValue: LoadingStateEnum) => void = useUpdateQuizError();

  const handleQuizStart: (topic: TopicEnum) => Promise<void> = async (
    topic: TopicEnum,
  ): Promise<void> => {
    try {
      handleTopicUpdate(topic);
      const epTopic: EPTopic = await getTopic(topic);
      const epQuestionsShuffled: EPQuestion[] =
        getEPQuestionsShuffledFromEPTopic(epTopic);
      setQuestions(epQuestionsShuffled);
      setError(LoadingStateEnum.SUCCEEDED);
      navigate(`${STARTPAGE_PATH}${QUIZ_SUB_PATH}`, { replace: true });
    } catch (error) {
      console.error(`${FAILED_QUIZ_START_ERROR_MESSAGE_PREFIX}${error}`);
      setError(LoadingStateEnum.FAILED);
    }
  };

  return { handleQuizStart };
};

export default useQuizStart;
