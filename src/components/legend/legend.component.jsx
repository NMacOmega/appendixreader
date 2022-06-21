import { useContext, useMemo } from "react";
import { MapBoxContext } from "../../contexts/mapbox.context";
import {
  LegendContainer,
  ConquestLegendSVG,
  ConquestLegendLandscapeSVG,
  SettlementLegendSVG,
  SettlementLegendLandscapeSVG,
  DavidicLegendSVG,
  DavidicLegendLandscapeSVG,
  JesusLegendSVG,
  JesusLegendLandscapeSVG,
} from "./legend.styles";

const Legend = () => {
  const { isLegendOpen, activeLayer } = useContext(MapBoxContext);

  const { innerWidth: x, innerHeight: y } = window;
  const isPortraitMode = x <= y || (x > y && x >= 1024);

  const LegendSVG = useMemo(() => {
    if (activeLayer.includes("Conquest"))
      return isPortraitMode ? (
        <ConquestLegendSVG />
      ) : (
        <ConquestLegendLandscapeSVG />
      );
    if (activeLayer.includes("Settlement"))
      return isPortraitMode ? (
        <SettlementLegendSVG />
      ) : (
        <SettlementLegendLandscapeSVG />
      );
    if (activeLayer.includes("David"))
      return isPortraitMode ? (
        <DavidicLegendSVG />
      ) : (
        <DavidicLegendLandscapeSVG />
      );
    if (activeLayer.includes("Jesus"))
      return isPortraitMode ? <JesusLegendSVG /> : <JesusLegendLandscapeSVG />;
    return null;
  }, [activeLayer, isPortraitMode]);

  return <LegendContainer isOpen={isLegendOpen}>{LegendSVG}</LegendContainer>;
};

export default Legend;
