import "./TopicButtonContainer.scss";
import React, { ReactElement } from "react";
import { TopicItem, TopicItems } from "@/globals/constants/TopicItems.ts";
import TopicButton from "@/components/container/TopicButton/TopicButton.tsx";
import useUpdateTopic from "@/hooks/redux/topic/dispatch/useUpdateTopic.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  QUIZ_SUB_PATH,
  STARTPAGE_PATH,
} from "@/globals/constants/Ressources.ts";
import {
  setQuestionsAndResetIndexAndScore,
  setQuizError,
} from "@/redux/slices/topicSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { EPTopic } from "@/globals/models/entrypoints/EPTopic.ts";
import { getTopic } from "@/globals/services/TopicService.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import shuffleArray from "@/globals/utils/shuffleArray.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";

const TopicButtonContainer: React.FC = (): ReactElement => {
  const handleTopicUpdate: (newValue: TopicEnum) => void = useUpdateTopic();
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const getEPQuestionsShuffledFromEPTopic = (
    epTopic: EPTopic,
  ): EPQuestion[] => {
    const epQuestionsOptionsShuffled = epTopic.questions.map((question) => {
      return { ...question, options: shuffleArray(question.options) };
    });
    return shuffleArray(epQuestionsOptionsShuffled);
  };

  const handleQuizStart = async (topic: TopicEnum) => {
    try {
      handleTopicUpdate(topic);
      const epTopic: EPTopic = await getTopic(topic);
      const epQuestionsShuffled: EPQuestion[] =
        getEPQuestionsShuffledFromEPTopic(epTopic);
      dispatch(setQuestionsAndResetIndexAndScore(epQuestionsShuffled));
      navigate(`${STARTPAGE_PATH}${QUIZ_SUB_PATH}`, { replace: true });
    } catch (error) {
      console.error(`FAILED_QUIZ_START_ERROR_MESSAGE_PREFIX${error}`);
      dispatch(setQuizError(LoadingStateEnum.FAILED));
    }
  };

  return (
    <div className="topicButtonContainer">
      {TopicItems.map(
        (topic: TopicItem, index: number): ReactElement => (
          <TopicButton
            key={index}
            text={topic.text}
            type={topic.topic}
            handleButtonClick={() => handleQuizStart(topic.topic)}
          />
        ),
      )}
    </div>
  );
};

export default TopicButtonContainer;
