import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";

const useRouterStartPage: () => void = (): void => {
  const navigate: NavigateFunction = useNavigate();
  const { pathname } = useLocation();

  useEffect((): void => {
    if (pathname !== STARTPAGE_PATH) {
      navigate(STARTPAGE_PATH, { replace: true });
    }
  }, [pathname, navigate]);
};

export default useRouterStartPage;
