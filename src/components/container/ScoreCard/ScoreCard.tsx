import "./ScoreCard.scss";
import TopicContainer from "@/components/container/TopicContainer/TopicContainer.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import useCurrentScore from "@/hooks/redux/topic/selector/useCurrentScore.ts";
import useScoreSubLine from "@/hooks/quiz/useScoreSubLine.ts";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";

const ScoreCard = () => {
  const score: number = useCurrentScore();
  const scoreSubLine: string = useScoreSubLine();
  const isDarkModeOn: boolean = useDarkMode();
  return (
    <div className={`scoreCard scoreCard--${isDarkModeOn ? "dark" : "light"}`}>
      <TopicContainer />
      <div className="scoreCardScore">
        <Label type={LabelTypeEnum.SCORE_LABEL} text={`${score}`} />
        <Label type={LabelTypeEnum.SCORE_SUB_LINE_LABEL} text={scoreSubLine} />
      </div>
    </div>
  );
};

export default ScoreCard;
