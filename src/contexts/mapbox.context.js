import { useState, useRef, createContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import {
  MODERN_LAYERS,
  POLY_LAYERS,
  ZOOM_STEPS,
  ZOOM_OPTIONS,
  MAP_VIEWPORTS,
} from "../assets/data/mapboxJSON";
import {
  generateZoomLevelCaseStatement,
  generateIconCaseStatement,
  generatePointLayerProperties,
  updateModernLayers,
} from "./mapbox.helper";

import geojson from "../assets/data/points.json";
import BLOBS from "../assets/data/blobs.json";

const mapboxToken = process.env.REACT_APP_MAPBOX_API_PUBLIC_KEY;
const mapboxStyleUri = process.env.REACT_APP_MAPBOX_STYLE_URI;
mapboxgl.accessToken = mapboxToken;
console.log(mapboxgl);
console.log(mapboxStyleUri);

export const MapBoxContext = createContext({
  mapboxMapRef: {},
  mapContainer: {},
  lat: 0,
  lng: 0,
  zoom: 0,
  baseViewport: null,
  featuresRef: [],
  activeLayer: "",
  activeLayerRef: "",
  activeFeature: {},
  activeFeatureRef: [],
  initializeMap: () => null,
  isLoading: false,
  errorRef: {},
  isModernLayersActive: false,
  isMapMenuOpen: false,
  isSearchMenuOpen: false,
  isLegendOpen: false,
  isInfoMenuOpen: false,
  //State variables above, methods below
  onLoadHandler: () => null,
  onLayerChange: () => null,
  onMapMove: () => null,
  flyToMapViewport: () => null,
  setIsLoading: () => null,
  setIsMapMenuOpen: () => null,
  setIsSearchMenuOpen: () => null,
  setIsLegendOpen: () => null,
  setIsInfoMenuOpen: () => null,
  setIsModernLayersActiveHandler: () => null,
  setActiveFeatureHandlerOnClick: () => null,
  selecteActiveFeatureOnSearch: () => null,
  setFeatureState: () => null,
  updatePinnedFeaturesOnMap: () => null,
  //JSON DATA CONSTANTS
  MODERN_LAYERS: {},
  POLY_LAYERS: {},
  ZOOM_STEPS: [],
  ZOOM_OPTIONS: [],
  MAP_VIEWPORTS: {},
  BLOBS: {},
});

console.log(mapboxgl);

export const MapBoxProvider = ({ children }) => {
  const initialMap = "polygons-settlement";
  const initialViewport = MAP_VIEWPORTS[initialMap] || MAP_VIEWPORTS.default;
  const [initLang, initLat] = initialViewport.center;
  const mapboxMapRef = useRef(null);
  const mapContainer = useRef(null);
  const [lat, setLat] = useState(initLat);
  const [lng, setLng] = useState(initLang);
  const [zoom, setZoom] = useState(initialViewport.zoom);
  const [baseViewport, setBaseViewport] = useState({
    ...initialViewport,
  });
  const [activeLayer, setActiveLayer] = useState("");
  const [activeFeature, setActiveFeature] = useState({});
  let featuresRef = useRef([]);
  let activeFeatureRef = useRef({});
  let pinnedFeaturesIdsRef = useRef([]);
  let activeLayerRef = useRef("");
  let errorRef = useRef({});

  const [isModernLayersActive, setIsModernLayersActive] = useState(false);
  const [isMapMenuOpen, setIsMapMenuOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const [isInfoMenuOpen, setIsInfoMenuOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initializeMap = () => {
    if (mapboxMapRef.current) return; // initialize map only once
    mapboxMapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapboxStyleUri,
      center: [lng, lat],
      zoom: zoom,
      //attributionControl: false, Removes attribution entirely, which is illegal
    });
    activeLayerRef.current = "polygons-settlement";
    console.log(mapboxMapRef);
    //setActiveLayer("polygons-settlement");
    //setActiveLayer(Object.keys(POLY_LAYERS)[0]);
  };

  const onLoadHandler = async () => {
    //console.log("Not loading Features yet");
    const { current: map } = mapboxMapRef;
    if (map.getSource("feature-points")) return;

    map
      .addSource("feature-points", {
        type: "geojson",
        data: { ...geojson },
        promoteId: "id",
      })
      .addLayer({ ...generatePointLayerProperties() });
    configLayerFilter(POLY_LAYERS[activeLayerRef.current]);

    const onIdle = () => {
      configFeatureState();
      // updateFeatureIds(
      //   POINTS_DATASET_ID,
      //   mapboxEditToken,
      //   mapboxMapRef.current
      // ); //Only use if we need to update IDs
      setActiveLayer(POLY_LAYERS[activeLayerRef.current]);
      setIsLoading(false);
      map.off("idle", onIdle);
    };

    map.on("idle", onIdle);
    map.on("error", (e) => onMapLoadError(e));
  };

  const onMapLoadError = (error) => {
    errorRef.current = {
      isError: true,
      message: error,
    };
  };

  const onLayerChange = (newLayer) => {
    if (newLayer === activeLayer.current) return;
    const { current: map } = mapboxMapRef;
    map.setPaintProperty(activeLayerRef.current, "fill-opacity", 0);
    map.setPaintProperty(newLayer, "fill-opacity", 1);
    configLayerFilter(POLY_LAYERS[newLayer]);
    activeLayerRef.current = newLayer;
    setActiveLayer(POLY_LAYERS[newLayer]);
    const newBaseViewPort = MAP_VIEWPORTS[newLayer]
      ? { ...MAP_VIEWPORTS[newLayer] }
      : { ...MAP_VIEWPORTS["default"] };
    setBaseViewport({ ...newBaseViewPort });
    flyToMapViewport({ ...newBaseViewPort });
  };

  const onMapMove = () => {
    const { current: map } = mapboxMapRef;
    setLng(map.getCenter().lng.toFixed(4));
    setLat(map.getCenter().lat.toFixed(4));
    setZoom(map.getZoom().toFixed(2));
    // console.log(map.getCenter());
    // console.log(map.getZoom());
  };

  const flyToMapViewport = (viewport) => {
    const { current: map } = mapboxMapRef;
    //const { innerWidth, innerHeight } = window;
    //console.log(innerWidth);
    map.flyTo({ ...viewport });
  };

  const setIsModernLayersActiveHandler = (bool) => {
    updateModernLayers(bool, MODERN_LAYERS, mapboxMapRef.current);
    setIsModernLayersActive(bool);
  };

  const setFeatureState = (featureId, prop, value, valuesObj) => {
    const { current: map } = mapboxMapRef;
    const hasMultipleValues = valuesObj && Object.keys(valuesObj).length > 0;
    const inputValue = hasMultipleValues ? { ...valuesObj } : { [prop]: value };

    map.setFeatureState(
      {
        source: "feature-points",
        //sourceLayer: "points",
        id: featureId,
      },
      { ...inputValue }
    );
  };

  const setActiveFeatureHandlerOnClick = (e) => {
    if (e.originalEvent.cancelBubble) return;
    e.originalEvent.cancelBubble = true;
    const { current: map } = mapboxMapRef;
    const { current: activeLayer } = activeLayerRef;

    const features = map
      .queryRenderedFeatures(e.point, {
        layers: ["points"],
      })
      .filter(
        (feature) =>
          feature.properties.map === POLY_LAYERS[activeLayer] ||
          feature.state.pinned
      );

    const newFeature = features[0] ?? undefined;
    transitionActiveFeature(newFeature);
    setIsMapMenuOpen(false);
    setIsSearchMenuOpen(false);
  };

  const selecteActiveFeatureOnSearch = (feature) => {
    if (!feature) return;
    transitionActiveFeature({ ...feature });
  };

  const transitionActiveFeature = (newFeature = {}) => {
    const { current: oldFeature } = activeFeatureRef;
    const { id: oldId } = oldFeature;
    const { id } = newFeature;
    const isNewFeature = id && id !== oldId;
    if (oldId) setFeatureState(oldId, "selected", false);
    if (id) setFeatureState(id, "selected", isNewFeature);
    const newFeatureRef = isNewFeature ? { ...newFeature } : {};
    setActiveFeature({ ...newFeatureRef });
    activeFeatureRef.current = { ...newFeatureRef };
    setIsInfoMenuOpen(isNewFeature);
  };

  const updatePinnedFeaturesOnMap = (id, addBool) => {
    const { current: oldIDsList } = pinnedFeaturesIdsRef;
    const newList = addBool
      ? [...oldIDsList, id]
      : oldIDsList.filter((i) => i !== id);
    pinnedFeaturesIdsRef.current = [...newList];
    const { current: map } = mapboxMapRef;
    map.setLayoutProperty(
      "points",
      "icon-image",
      generateIconCaseStatement([...newList])
    );
  };

  const configLayerFilter = (mapName) => {
    const { current: map } = mapboxMapRef;
    const pointFilterStatement = generateZoomLevelCaseStatement(
      mapName,
      ZOOM_STEPS
    );
    map.setPaintProperty("points", "text-opacity", pointFilterStatement);
    map.setPaintProperty("points", "icon-opacity", pointFilterStatement);
  };

  const configFeatureState = () => {
    const { current: map } = mapboxMapRef;
    const features = map.querySourceFeatures("feature-points", {
      sourceLayer: "points",
    });
    featuresRef.current = features.reduce((acc, feat) => {
      return !acc.find((f) => f.id === feat.id)
        ? [...acc, { ...feat }]
        : [...acc];
    }, []);
    features.map((feature) => {
      const { properties } = feature;
      const { zoom = 9.5, textOffsetX = 0, textOffsetY = 1.2 } = properties;
      const stateObj = {
        zoom: zoom,
        textOffsetX: textOffsetX,
        textOffsetY: textOffsetY,
        textOffset: [textOffsetX, textOffsetY],
      };
      setFeatureState(feature.id, null, null, { ...stateObj });
    });
  };

  const value = {
    mapboxMapRef,
    mapContainer,
    lat,
    lng,
    zoom,
    baseViewport,
    featuresRef,
    activeLayer,
    activeLayerRef,
    activeFeature,
    activeFeatureRef,
    initializeMap,
    isLoading,
    errorRef,
    isModernLayersActive,
    isMapMenuOpen,
    isSearchMenuOpen,
    isLegendOpen,
    isInfoMenuOpen,
    //State variables above, methods below
    onLoadHandler,
    onLayerChange,
    onMapMove,
    flyToMapViewport,
    setIsLoading,
    setIsMapMenuOpen,
    setIsSearchMenuOpen,
    setIsLegendOpen,
    setIsInfoMenuOpen,
    setIsModernLayersActiveHandler,
    setActiveFeatureHandlerOnClick,
    selecteActiveFeatureOnSearch,
    setFeatureState,
    updatePinnedFeaturesOnMap,
    //JSON DATA FEATURES
    MODERN_LAYERS,
    POLY_LAYERS,
    ZOOM_STEPS,
    ZOOM_OPTIONS,
    MAP_VIEWPORTS,
    BLOBS,
  };

  return (
    <MapBoxContext.Provider value={value}>{children}</MapBoxContext.Provider>
  );
};
