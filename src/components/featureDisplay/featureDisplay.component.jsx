import { useState, useEffect, useContext } from "react";
import { MapBoxContext } from "../../contexts/mapbox.context";
import FeatureBlob from "../featureBlob/featureBlob.component";
import Icon from "../generic-components/Icon/icon.component";

import {
  FeatureDisplayContainer,
  FeatureDisplayBackground,
  FeatureDisplayBodyContainer,
  FeatureDisplayBody,
  FeatureDisplayHeading,
  FeatureDisplayHeadingTitle,
  CloseSpan,
  PinSpan,
} from "./featureDisplay.styles";

const FeatureDisplay = () => {
  const {
    mapboxMapRef,
    isInfoMenuOpen,
    setIsInfoMenuOpen,
    activeLayerRef,
    activeFeatureRef,
    setFeatureState,
    updatePinnedFeaturesOnMap,
    BLOBS,
    MAP_VIEWPORTS,
    flyToMapViewport,
  } = useContext(MapBoxContext);

  const { current: feature = {} } = activeFeatureRef;
  const { id, properties = {}, state = {} } = feature;
  const { name, map } = properties;
  const { pinned } = state;
  const [isFeaturePinned, setIsFeaturePinned] = useState(pinned);
  const featureBlob = BLOBS[id];

  useEffect(() => {
    const geometry = activeFeatureRef.current?.properties?.geometry;
    if (!geometry) return;
    const [x, y] = JSON.parse(geometry)?.coordinates;
    const yAdjusted = y - 0.2;

    if (!mapboxMapRef.current || !x || !y) return;

    flyToMapViewport({
      center: [x, yAdjusted],
      zoom: 9.0,
      speed: 0.3,
      bearing: 0,
      pitch: 0,
    });
  }, [activeFeatureRef.current]);

  const onCloseHandler = () => {
    if (mapboxMapRef.current) setFeatureState(id, "selected", false);
    setIsInfoMenuOpen(false);
    setIsFeaturePinned(false);
    flyToMapViewport(MAP_VIEWPORTS[activeLayerRef.current]);
  };

  const onPinHandler = () => {
    const currentState = { ...activeFeatureRef?.current?.state };
    const isPinned = currentState.pinned;
    setFeatureState(id, "pinned", !isPinned);
    updatePinnedFeaturesOnMap(id, !isPinned);
    activeFeatureRef.current.state = { ...currentState, pinned: !isPinned };
    setIsFeaturePinned(!isPinned);
  };

  return (
    isInfoMenuOpen && (
      <FeatureDisplayContainer isOpen={isInfoMenuOpen}>
        <FeatureDisplayBackground>
          <FeatureDisplayHeading>
            <FeatureDisplayHeadingTitle>{name}</FeatureDisplayHeadingTitle>
            <PinSpan onClick={onPinHandler}>
              <Icon>{!pinned ? "add_location_alt" : "location_off"}</Icon>
              {/* Could also  Use  "push_pin" and "motion_photos_off" */}
            </PinSpan>
            <CloseSpan onClick={onCloseHandler}>
              <Icon>close</Icon>
            </CloseSpan>
          </FeatureDisplayHeading>
          <FeatureDisplayBodyContainer>
            <FeatureDisplayBody>
              <FeatureBlob blobObject={featureBlob} />
            </FeatureDisplayBody>
          </FeatureDisplayBodyContainer>
        </FeatureDisplayBackground>
      </FeatureDisplayContainer>
    )
  );
};

export default FeatureDisplay;
