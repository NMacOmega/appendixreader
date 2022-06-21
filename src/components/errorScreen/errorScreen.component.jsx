import { ErrorContainer, Error } from "./errorScreen.styles";
import Icon from "../generic-components/Icon/icon.component";
const ErrorScreen = ({ error }) => {
  const { message } = error;

  return (
    <ErrorContainer>
      <Error>
        <p>
          <strong>Error</strong>
        </p>
        <Icon>error</Icon>
        <p>{message}</p>
        <p>Close page and try again later.</p>
      </Error>
    </ErrorContainer>
  );
};

export default ErrorScreen;
