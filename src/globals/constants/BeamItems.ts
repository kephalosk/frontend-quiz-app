import { BeamColorEnum } from "@/globals/models/enums/BeamColorEnum.ts";

export interface BeamItem {
  index: number;
  color: BeamColorEnum;
}

export const BeamItems: BeamItem[] = [
  { index: 1, color: BeamColorEnum.TRANSPARENT },
  { index: 2, color: BeamColorEnum.TRANSPARENT },
  { index: 3, color: BeamColorEnum.TRANSPARENT },
  { index: 4, color: BeamColorEnum.TRANSPARENT },
];
