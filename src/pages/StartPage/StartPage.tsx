import "./StartPage.scss";
import React, { ReactElement } from "react";
import TitleContainer from "@/components/container/TitleContainer/TitleContainer.tsx";
import {
  STARTPAGE_HEADLINE_BOLD_TEXT,
  STARTPAGE_HEADLINE_TEXT,
  STARTPAGE_SUB_LINE_TEXT,
} from "@/globals/constants/Constants.ts";
import TopicButtonContainer from "@/components/container/TopicButtonContainer/TopicButtonContainer.tsx";
import useRouterStartPage from "@/hooks/router/useRouterStartPage.ts";

const StartPage: React.FC = (): ReactElement => {
  useRouterStartPage();

  return (
    <div className="startPage">
      <TitleContainer
        firstLine={STARTPAGE_HEADLINE_TEXT}
        headline={STARTPAGE_HEADLINE_BOLD_TEXT}
        subLine={STARTPAGE_SUB_LINE_TEXT}
      />
      <TopicButtonContainer />
    </div>
  );
};

export default StartPage;
