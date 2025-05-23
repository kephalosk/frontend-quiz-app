import { useMemo } from "react";

export interface ProgressPerCentProps {
  currentIndex: number;
  totalQuestions: number;
}

const useProgressPerCent: (arg0: ProgressPerCentProps) => number = ({
  currentIndex,
  totalQuestions,
}: ProgressPerCentProps): number => {
  return useMemo(
    () => ((currentIndex + 1) / totalQuestions) * 100,
    [currentIndex, totalQuestions],
  );
};

export default useProgressPerCent;
