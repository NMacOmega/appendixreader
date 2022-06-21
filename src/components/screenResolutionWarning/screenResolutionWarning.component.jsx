import { WarningContainer, Warning } from "./screenResolutionWarning.styles";
import Icon from "../generic-components/Icon/icon.component";
const ScreenResolutionWarning = () => {
  return (
    <WarningContainer>
      <Warning>
        <p>
          <code>Screen too small</code>
        </p>
        <Icon>aspect_ratio</Icon>
      </Warning>
    </WarningContainer>
  );
};

export default ScreenResolutionWarning;
