import { NavigateFunction, useNavigate } from "react-router-dom";
import useResetTopic from "@/hooks/redux/topic/dispatch/useResetTopic.ts";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";
import { ResetGameHook } from "@/globals/models/types/ResultTypes.ts";
import { useCallback, useState } from "react";

const useResetGame: () => ResetGameHook = (): ResetGameHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const resetGame: () => void = useResetTopic();
  const handleReset: () => void = useCallback((): void => {
    setIsLoading(true);
    navigate(STARTPAGE_PATH, { replace: true });
    setTimeout(() => {
      resetGame();
      setIsLoading(false);
    }, 1000);
  }, [navigate, resetGame]);

  return { handleReset, isLoading };
};

export default useResetGame;
