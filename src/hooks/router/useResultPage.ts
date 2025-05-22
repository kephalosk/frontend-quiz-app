import { useCallback } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  RESULT_SUB_PATH,
  STARTPAGE_PATH,
} from "@/globals/constants/Ressources.ts";
import { ResultPageHook } from "@/globals/models/types/RouterTypes.ts";

const useResultPage: () => ResultPageHook = (): ResultPageHook => {
  const navigate: NavigateFunction = useNavigate();

  const loadResultPage: () => void = useCallback((): void => {
    navigate(`${STARTPAGE_PATH}${RESULT_SUB_PATH}`);
  }, [navigate]);

  return { loadResultPage };
};

export default useResultPage;
