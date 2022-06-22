import { useEffect, useContext } from "react";
import { MapBoxContext } from "../../contexts/mapbox.context";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapContainer } from "./map.styles";

import ModernLayerToggle from "../modernLayerToggle/modernLayerToggle.component";
import LayerMenu from "../layer-menu/layer-menu.component";
import AutocompleteSearch from "../autocomplete-search/autocomplete-search.component";
import ViewPortDisplay from "../viewportDisplay/viewportDisplay.component";
import ViewportResetButton from "../viewportReset/viewportResetButton.component";
import LegendDisplayToggle from "../legendDisplayToggle/legendDisplayToggle.component";
import FeatureDisplay from "../featureDisplay/featureDisplay.component";
import MapHeading from "../mapHeadingDisplay/mapHeadingDisplay.component";
import Legend from "../legend/legend.component";
import LoadingScreen from "../loadingScreen/loadingScreen.component";
import ScreenResolutionWarning from "../screenResolutionWarning/screenResolutionWarning.component";
import ErrorScreen from "../errorScreen/errorScreen.component";

const MapComponent = () => {
  const {
    mapboxMapRef,
    mapContainer,
    initializeMap,
    onLoadHandler,
    onMapMove,
    setActiveFeatureHandlerOnClick,
    isInfoMenuOpen,
    errorRef,
  } = useContext(MapBoxContext);

  const { current: error = {} } = errorRef || {};

  useEffect(() => {
    initializeMap();
    mapboxMapRef.current.on("load", () => {
      onLoadHandler();
    });
  });

  useEffect(() => {
    if (!mapboxMapRef.current) return;
    mapboxMapRef.current.on("move", () => {
      onMapMove();
    });

    mapboxMapRef.current.on("click", (e) => {
      setActiveFeatureHandlerOnClick(e);
    });

    // mapboxMap.current.on("mouseenter", layer, () => {
    //   console.log("Hovering");
    //   mapboxMap.current.getCanvas().style.cursor = "pointer";
    // });

    // mapboxMapRef.current.on("mouseleave", layer, () => {
    //   mapboxMapRef.current.getCanvas().style.cursor = "";
    // });
  });

  return (
    <>
      <MapContainer>
        <div>
          <div
            ref={mapContainer}
            className="map-container"
            style={{ height: "100vh" }}
          />
        </div>
        <MapHeading />
        <ModernLayerToggle />
        <LegendDisplayToggle />
        <ViewportResetButton />
        <Legend />
        {!isInfoMenuOpen && <LayerMenu />}
        <AutocompleteSearch />
        <FeatureDisplay />
        {/* <LoadingScreen /> */}
      </MapContainer>
      <ScreenResolutionWarning />
      {error.isError && <ErrorScreen error={{ ...error }} />}
    </>
  );
};

export default MapComponent;
