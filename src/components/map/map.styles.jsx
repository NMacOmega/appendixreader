import styled from "styled-components";

export const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;

  .mapboxgl-ctrl-logo {
    display: none;
  }
  .mapboxgl-ctrl-attrib-inner {
    display: none;
  }

  .mapboxgl-ctrl .mapboxgl-ctrl-attrib .mapboxgl-compact {
    display: block;
    right: 90px;
    bottom: 90px;
  }
`;
