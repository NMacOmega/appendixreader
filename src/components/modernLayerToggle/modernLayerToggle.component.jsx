import { useContext } from "react";
import Icon from "../generic-components/Icon/icon.component";
import { ModernLayerToggleButton } from "./modernLayerToggle.styles";
import { MapBoxContext } from "../../contexts/mapbox.context";

const ModernLayerToggle = () => {
  const { isModernLayersActive, setIsModernLayersActiveHandler } =
    useContext(MapBoxContext);

  const onMapStylesToggle = () => {
    setIsModernLayersActiveHandler(!isModernLayersActive);
  };

  return (
    <ModernLayerToggleButton onClick={onMapStylesToggle}>
      <Icon>timelapse</Icon>
    </ModernLayerToggleButton>
  );
};

export default ModernLayerToggle;
