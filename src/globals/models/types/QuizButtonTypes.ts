export type QuizButtonClassesHook = {
  quizButtonClasses: string;
  quizButtonPositionClasses: string;
};

export type QuizButtonIconHook = {
  showIcon: boolean;
  src: string;
  alt: string;
};

import React, { KeyboardEventHandler, MouseEventHandler } from "react";

export type QuizButtonBehaviorHook = {
  ref: React.RefObject<HTMLButtonElement | null>;
  isClickable: boolean;
  buttonEventProps: {
    onClick?: MouseEventHandler;
    onKeyDown?: KeyboardEventHandler;
    onMouseDown?: MouseEventHandler;
  };
};

export type QuizButtonHandleButtonClickHook = {
  handleButtonClick: () => void;
};
