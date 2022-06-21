import { useContext } from "react";
import { MapBoxContext } from "../../contexts/mapbox.context";
import Spinner from "../spinner/spinner.component";
import { LoadingContainer, Loader } from "./loadingScreen.styles";

const ScreenResolutionWarning = () => {
  const { isLoading } = useContext(MapBoxContext);

  return (
    <LoadingContainer isOpen={isLoading}>
      <Loader>
        <Spinner />
      </Loader>
    </LoadingContainer>
  );
};

export default ScreenResolutionWarning;
