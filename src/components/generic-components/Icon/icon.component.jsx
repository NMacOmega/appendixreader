import "../../../assets/css/fonts.css";
import { CustomIconContainer } from "./icon.styles";

const Icon = ({ children }, ...otherProps) => {
  return (
    <CustomIconContainer {...otherProps}>
      <span className="material-icons">{children}</span>
    </CustomIconContainer>
  );
};

export default Icon;
