import { useLocation } from "react-router-dom";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";

const useShowTopic: () => boolean = (): boolean => {
  const { pathname } = useLocation();
  return pathname != STARTPAGE_PATH;
};

export default useShowTopic;
