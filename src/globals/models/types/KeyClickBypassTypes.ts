import React from "react";

export type KeyClickBypassHook = {
  handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleClick: () => void;
};
