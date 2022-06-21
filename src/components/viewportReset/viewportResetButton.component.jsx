import { useContext } from "react";
import Icon from "../generic-components/Icon/icon.component";
import { ViewPortResetButton } from "./viewportResetButtonstyles";
import { MapBoxContext } from "../../contexts/mapbox.context";

const ViewportResetButton = () => {
  const {
    setIsMapMenuOpen,
    setIsModernLayersActiveHandler,
    setIsSearchMenuOpen,
    setIsLegendOpen,
    baseViewport,
    flyToMapViewport,
  } = useContext(MapBoxContext);

  const onResetViewportHandler = () => {
    flyToMapViewport({ ...baseViewport });
    setIsMapMenuOpen(false);
    setIsLegendOpen(false);
    setIsModernLayersActiveHandler(false);
    setIsSearchMenuOpen(false);
    // setIsInfoMenuOpen(false); // Causing problems with seelected features
  };

  return (
    <ViewPortResetButton onClick={onResetViewportHandler}>
      <Icon>refresh</Icon>
    </ViewPortResetButton>
  );
};

export default ViewportResetButton;
