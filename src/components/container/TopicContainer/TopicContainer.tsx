import "./TopicContainer.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { TopicButtonIconHook } from "@/globals/models/types/TopicButtonTypes.ts";
import useTopicButtonIcon from "@/hooks/topicButton/useTopicButtonIcon.ts";

export interface TopicContainerProps {
  text: string;
  type: TopicEnum;
}

const TopicContainer: React.FC<TopicContainerProps> = React.memo(
  ({ text, type }: TopicContainerProps): ReactElement => {
    const { src, alt, color }: TopicButtonIconHook = useTopicButtonIcon(type);

    return (
      <div className="topicContainer">
        <img
          className={`topicContainerIcon topicContainerIcon--${color}`}
          src={src}
          alt={alt}
          aria-hidden={true}
        />
        <Label
          className="topicContainerText"
          type={LabelTypeEnum.QUIZ_BUTTON_LABEL}
          text={text}
        />
      </div>
    );
  },
);

export default TopicContainer;
