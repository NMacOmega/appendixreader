import { useContext } from "react";
import { MapBoxContext } from "../../contexts/mapbox.context";
import {
  LayerMenuComponent,
  LayerMenuOuterContainer,
  LayerMenuInnerContainer,
  OpenLayerMenuButtonComponent,
  LayerChoiceButton,
  ButtonTextSpan,
} from "./layer-menu.styles";
import Icon from "../generic-components/Icon/icon.component";

const LayerMenu = () => {
  const {
    isMapMenuOpen,
    setIsMapMenuOpen,
    POLY_LAYERS,
    activeLayer,
    onLayerChange,
  } = useContext(MapBoxContext);

  const onLayerButtonClick = (newLayer) => {
    onLayerChange(newLayer);
    setIsMapMenuOpen(false);
  };

  const toggleLayerMenuOpen = () => {
    setIsMapMenuOpen(!isMapMenuOpen);
  };

  const materialIconText = isMapMenuOpen
    ? "keyboard_arrow_right"
    : "keyboard_arrow_left";

  const layerButtons = Object.entries(POLY_LAYERS).map(([id, title]) => {
    return (
      <LayerChoiceButton
        key={`layer_button_${id}`}
        highlight={title === activeLayer}
        onClick={() => {
          onLayerButtonClick(id);
        }}
      >
        <ButtonTextSpan>{title}</ButtonTextSpan>
      </LayerChoiceButton>
    );
  });

  return (
    <LayerMenuOuterContainer>
      <LayerMenuInnerContainer isOpen={isMapMenuOpen}>
        <OpenLayerMenuButtonComponent
          onClick={toggleLayerMenuOpen}
          isOpen={isMapMenuOpen}
        >
          <Icon>{materialIconText}</Icon>
        </OpenLayerMenuButtonComponent>
        <LayerMenuComponent isOpen={isMapMenuOpen}>
          {layerButtons}
        </LayerMenuComponent>
      </LayerMenuInnerContainer>
    </LayerMenuOuterContainer>
  );
};
export default LayerMenu;
