import { useContext } from "react";
import Icon from "../generic-components/Icon/icon.component";
import { LegendButton } from "./legendDisplayToggle.styles";
import { MapBoxContext } from "../../contexts/mapbox.context";

const LegendDisplayToggle = () => {
  const { isLegendOpen, setIsLegendOpen } = useContext(MapBoxContext);

  const onLegendToggle = () => {
    setIsLegendOpen(!isLegendOpen);
  };

  return (
    <LegendButton onClick={onLegendToggle}>
      <Icon>map</Icon>
    </LegendButton>
  );
};

export default LegendDisplayToggle;
