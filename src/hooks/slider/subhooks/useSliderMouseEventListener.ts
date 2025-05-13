import React, { useEffect } from "react";

const useSliderMouseEventListener = (
  isDragging: boolean,
  handleMouseMove: (event: MouseEvent | React.MouseEvent) => void,
  handleMouseUp: () => void,
): void => {
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
};

export default useSliderMouseEventListener;
