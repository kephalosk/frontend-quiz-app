import "./TopicButtonContainer.scss";
import React, { ReactElement } from "react";
import { TopicItem, TopicItems } from "@/globals/constants/TopicItems.ts";
import TopicButton from "@/components/container/TopicButton/TopicButton.tsx";
import useUpdateTopic from "@/hooks/redux/topic/dispatch/useUpdateTopic.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

const QuizButtonContainer: React.FC = (): ReactElement => {
  const handleTopicUpdate: (newValue: TopicEnum) => void = useUpdateTopic();

  return (
    <div className="quizButtonContainer">
      {TopicItems.map(
        (topic: TopicItem, index: number): ReactElement => (
          <TopicButton
            key={index}
            text={topic.text}
            type={topic.topic}
            handleButtonClick={() => handleTopicUpdate(topic.topic)}
          />
        ),
      )}
    </div>
  );
};

export default QuizButtonContainer;
