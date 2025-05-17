import "./HeaderContainer.scss";
import React from "react";
import TopicContainer from "../TopicContainer/TopicContainer";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import { ACCESSIBILITY_TEXT } from "@/globals/constants/Constants.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

const HeaderContainer: React.FC = () => {
  //const {text, type} = useTopic();
  return (
    <div className="headerContainer">
      <TopicContainer
        text={ACCESSIBILITY_TEXT}
        type={TopicEnum.ACCESSIBILITY}
      />
      <DarkModeSwitch />
    </div>
  );
};

export default HeaderContainer;
