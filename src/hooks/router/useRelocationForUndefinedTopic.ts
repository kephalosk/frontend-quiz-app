import useTopic from "@/hooks/redux/topic/selector/useTopic.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";
import { useEffect } from "react";

const useRelocationForUndefinedTopic = () => {
  const currentTopic: TopicEnum | null = useTopic();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (currentTopic === null) {
      navigate(STARTPAGE_PATH, { replace: true });
    }
  }, [currentTopic, navigate]);
};

export default useRelocationForUndefinedTopic;
