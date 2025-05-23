import { NavigateFunction, useNavigate } from "react-router-dom";
import useResetTopic from "@/hooks/redux/topic/dispatch/useResetTopic.ts";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";
import { ResetGameHook } from "@/globals/models/types/ResultTypes.ts";
import { useCallback } from "react";

const useResetGame: () => ResetGameHook = (): ResetGameHook => {
  const navigate: NavigateFunction = useNavigate();
  const resetGame: () => void = useResetTopic();
  const handleReset: () => void = useCallback((): void => {
    resetGame();
    navigate(STARTPAGE_PATH, { replace: true });
  }, [navigate, resetGame]);

  return { handleReset };
};

export default useResetGame;
