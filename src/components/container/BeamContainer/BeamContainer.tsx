import "./BeamContainer.scss";
import { BeamItem } from "@/globals/constants/BeamItems.ts";
import React, { ReactElement } from "react";
import Beam from "@/components/atoms/Beam/Beam.tsx";
import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import useMarkedBeams from "@/hooks/beam/useMarkedBeams.ts";

export interface BeamContainerProps {
  securityLevel: SecurityLevelEnum;
}

const BeamContainer: React.FC<BeamContainerProps> = ({
  securityLevel,
}: BeamContainerProps) => {
  const { beams } = useMarkedBeams(securityLevel);

  return (
    <div className="beamContainer">
      {beams.map(
        (beam: BeamItem): ReactElement => (
          <Beam key={beam.index} color={beam.color} />
        ),
      )}
    </div>
  );
};

export default BeamContainer;
