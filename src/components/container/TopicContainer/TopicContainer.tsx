import "./TopicContainer.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import {
  TopicButtonIconHook,
  TopicTextAndTypeHook,
} from "@/globals/models/types/TopicTypes.ts";
import useTopicButtonIcon from "@/hooks/topicButton/useTopicButtonIcon.ts";
import useTopicTextAndType from "@/hooks/topic/useTopicTextAndType.ts";

const TopicContainer: React.FC = React.memo((): ReactElement => {
  const { text, type }: TopicTextAndTypeHook = useTopicTextAndType();
  const { src, alt, color }: TopicButtonIconHook = useTopicButtonIcon(type);

  return (
    <div
      className={`topicContainer ${!text.length && "topicContainer--hidden"}`}
    >
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
});

export default TopicContainer;
