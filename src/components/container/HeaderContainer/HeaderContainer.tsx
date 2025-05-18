import "./HeaderContainer.scss";
import React from "react";
import TopicContainer from "../TopicContainer/TopicContainer";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import useShowTopic from "@/hooks/topic/useShowTopic.ts";

const HeaderContainer: React.FC = () => {
  const showTopic: boolean = useShowTopic();

  return (
    <div className="headerContainer">
      {showTopic && <TopicContainer />}
      <DarkModeSwitch />
    </div>
  );
};

export default HeaderContainer;
