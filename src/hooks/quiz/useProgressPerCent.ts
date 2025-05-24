import { useMemo } from "react";

export interface ProgressPerCentProps {
  currentIndex: number;
  totalQuestions: number;
}

const useProgressPerCent: (arg0: ProgressPerCentProps) => number = ({
  currentIndex,
  totalQuestions,
}: ProgressPerCentProps): number => {
  if (currentIndex + 1 >= totalQuestions) {
    throw Error("currentIndex + 1 > totalQuestions");
  }
  if (currentIndex < 0) {
    throw Error("currentIndex < 0");
  }
  return useMemo(
    () => ((currentIndex + 1) / totalQuestions) * 100,
    [currentIndex, totalQuestions],
  );
};

export default useProgressPerCent;
