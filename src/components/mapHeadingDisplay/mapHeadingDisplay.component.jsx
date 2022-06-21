import { useContext } from "react";
import { MapBoxContext } from "../../contexts/mapbox.context";
import {
  MapHeadingContainer,
  MapHeadingBody,
  ConquestTimelineSVG,
  SettlementTimelineSVG,
  DavidicTimelineSVG,
  JesusTimelineSVG,
} from "./mapHeadingDisplay.styles";

const MapHeading = () => {
  const { activeLayer } = useContext(MapBoxContext);

  const TimeLineSVG = (map) => {
    if (map.includes("Conquest")) return <ConquestTimelineSVG />;
    if (map.includes("Settlement")) return <SettlementTimelineSVG />;
    if (map.includes("David")) return <DavidicTimelineSVG />;
    if (map.includes("Jesus")) return <JesusTimelineSVG />;
    return null;
  };

  return (
    <MapHeadingContainer>
      <MapHeadingBody>{activeLayer}</MapHeadingBody>
      {TimeLineSVG(activeLayer)}
    </MapHeadingContainer>
  );
};

export default MapHeading;
