import "./ResultPage.scss";
import React, { ReactElement } from "react";
import TitleContainer from "@/components/container/TitleContainer/TitleContainer.tsx";
import {
  EMPTY_STRING,
  PLAY_AGAIN_BUTTON_TEXT,
  RESULTPAGE_HEADLINE_BOLD_TEXT,
  RESULTPAGE_HEADLINE_TEXT,
} from "@/globals/constants/Constants.ts";
import ScoreCard from "@/components/container/ScoreCard/ScoreCard.tsx";
import SubmitButton from "@/components/atoms/SubmitButton/SubmitButton.tsx";
import useResetGame from "@/hooks/result/useResetGame.ts";
import { ResetGameHook } from "@/globals/models/types/ResultTypes.ts";

const ResultPage: React.FC = (): ReactElement => {
  const { handleReset }: ResetGameHook = useResetGame();

  return (
    <div className="resultPage">
      <TitleContainer
        firstLine={RESULTPAGE_HEADLINE_TEXT}
        headline={RESULTPAGE_HEADLINE_BOLD_TEXT}
        subLine={EMPTY_STRING}
      />
      <div className="resultPageResult">
        <ScoreCard />
        <SubmitButton
          text={PLAY_AGAIN_BUTTON_TEXT}
          handleButtonClick={handleReset}
        />
      </div>
    </div>
  );
};

export default ResultPage;
