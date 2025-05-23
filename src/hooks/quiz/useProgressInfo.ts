import { useMemo } from "react";

export interface ProgressInfoProps {
  currentIndex: number;
  totalQuestions: number;
}

const useProgressInfo: (arg0: ProgressInfoProps) => string = ({
  currentIndex,
  totalQuestions,
}: ProgressInfoProps): string => {
  return useMemo(
    () => `Question ${currentIndex + 1} of ${totalQuestions}`,
    [currentIndex, totalQuestions],
  );
};

export default useProgressInfo;
