import styled from "styled-components";
import Button from "../generic-components/Button/Button.component";

export const ViewPortResetButton = styled(Button)`
  position: absolute;
  top: 140px;
  right: 1rem;
  width: 3rem;
  height: 3rem;

  * {
    font-size: 2.5rem;
  }

  @media (min-width: 540px) and (min-height: 300px) {
    top: 0.75rem;
    right: 2rem;
    width: 4rem;
    height: 4rem;
    * {
      font-size: 3.5rem;
    }
  }

  @media (min-width: 820px) and (min-height: 500px) {
    width: 5rem;
    height: 5rem;
  }
`;
