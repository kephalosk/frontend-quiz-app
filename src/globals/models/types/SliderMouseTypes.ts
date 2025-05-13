import React from "react";

export type SliderMouseHook = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleClick: (event: React.MouseEvent) => void;
  isDragging: boolean;
  handleMouseDown: () => void;
};

export type SliderMouseUpdateHook = {
  updatePosition: (event: MouseEvent | React.MouseEvent) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleClick: (event: React.MouseEvent) => void;
};

export type SliderMouseOnDraggingChangeHook = {
  onDraggingChange: (newDragging: boolean) => void;
  isDragging: boolean;
};

export type SliderMouseMouseDownHook = { handleMouseDown: () => void };

export type SliderMouseMouseUpHook = { handleMouseUp: () => void };

export type SliderMouseMouseMoveHook = {
  handleMouseMove: (event: MouseEvent | React.MouseEvent) => void;
};

export type SliderMouseTimeoutHook = {
  setTimeoutId: (
    value:
      | ((prevState: NodeJS.Timeout | null) => NodeJS.Timeout | null)
      | NodeJS.Timeout
      | null,
  ) => void;
  clearTimeoutId: () => void;
};
