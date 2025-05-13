import "./Beam.scss";
import React, { ReactElement } from "react";
import { BeamColorEnum } from "@/globals/models/enums/BeamColorEnum.ts";

export interface BeamProps {
  color?: BeamColorEnum;
}

const Beam: React.FC<BeamProps> = ({
  color = BeamColorEnum.TRANSPARENT,
}: BeamProps): ReactElement => {
  return <div className={`beam ${color}`}></div>;
};

export default Beam;
