import styled from "styled-components";
import Button from "../generic-components/Button/Button.component";

export const ModernLayerToggleButton = styled(Button)`
  position: absolute;
  bottom: 0.5rem;
  left: 4rem;
  width: 3rem;
  height: 3rem;

  * {
    font-size: 2.5rem;
  }

  @media (min-width: 540px) and (min-height: 300px) {
    width: 4rem;
    height: 4rem;
    left: 5.5rem;
    * {
      font-size: 3.5rem;
    }
  }

  @media (min-width: 820px) and (min-height: 500px) {
    width: 5rem;
    height: 5rem;
    left: 6.5rem;
  }
`;
