import React from "react";

export type SliderKeyboardHook = {
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleKeyUp: () => void;
  isFocused: boolean;
  onFocusChange: (newFocus: boolean) => void;
};

export type SliderKeyboardFocusHook = {
  onFocusChange: (newFocus: boolean) => void;
  isFocused: boolean;
};

export type SliderKeyboardKeyDownHook = {
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export type SliderKeyboardKeyUpHook = {
  handleKeyUp: () => void;
};
