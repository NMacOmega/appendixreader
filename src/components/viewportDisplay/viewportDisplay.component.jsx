import { ViewPortDisplayStyle } from "./viewportDisplay.styles";
import { useContext } from "react";
import { MapBoxContext } from "../../contexts/mapbox.context";

const ViewPortDisplay = () => {
  const { zoom } = useContext(MapBoxContext);

  //NEED MAP LAYERS TO CREATE RADIOI AND DROPDOWN FOR MAP STYLES AND ZOOM LEVELS

  //USE THESE TO MAKE DROPDOWN OF MAPS AND RADIOS FOR EACH ZOOM OPTION

  return <ViewPortDisplayStyle>{`Zoom: ${zoom}`}</ViewPortDisplayStyle>;
};

export default ViewPortDisplay;
