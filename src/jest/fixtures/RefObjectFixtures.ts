import { mockedDOMRect } from "@/jest/fixtures/DOMRectFixtures.ts";
import React from "react";

export const mockedRefObjectDiv: React.RefObject<HTMLDivElement> = {
  current: {
    offsetWidth: 100,
    getBoundingClientRect: (): DOMRect => mockedDOMRect,
  } as HTMLDivElement,
};
