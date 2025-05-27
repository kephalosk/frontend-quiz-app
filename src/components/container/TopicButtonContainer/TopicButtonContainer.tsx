import "./TopicButtonContainer.scss";
import React, { ReactElement } from "react";
import { TopicItem, TopicItems } from "@/globals/constants/TopicItems.ts";
import TopicButton from "@/components/container/TopicButton/TopicButton.tsx";
import { QuizStartHook } from "@/globals/models/types/QuizTypes.ts";
import useQuizStart from "@/hooks/quiz/useQuizStart.ts";

const TopicButtonContainer: React.FC = (): ReactElement => {
  const { handleQuizStart }: QuizStartHook = useQuizStart();

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
