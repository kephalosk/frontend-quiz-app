import "./HeaderContainer.scss";
import React from "react";
import TopicContainer from "../TopicContainer/TopicContainer";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";

const HeaderContainer: React.FC = () => {
  return (
    <div className="headerContainer">
      <TopicContainer />
      <DarkModeSwitch />
    </div>
  );
};

export default HeaderContainer;
