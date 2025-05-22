import { useCallback, useState } from "react";
import { ResetKeyHook } from "@/globals/models/types/QuizTypes.ts";

const useResetKey = (): ResetKeyHook => {
  const [resetKey, setResetKey] = useState<number>(0);

  const resetStatusArray = useCallback(() => {
    setResetKey((key: number): number => key + 1);
  }, []);

  return { resetKey, resetStatusArray };
};

export default useResetKey;
