import styled from "styled-components";

export const Warning = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;

  .material-icons {
    font-size: 10rem;
    margin: 0 10px;
  }

  @media screen and (orientation: landscape) {
    flex-direction: row;
  }
`;

export const WarningContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;

  @media screen and (orientation: portrait) and (min-width: 360px) and (min-height: 665px),
    screen and (orientation: landscape) and (min-width: 665px) and (min-height: 360px) {
    display: none;
  }
`;
/*Set container to display none because it displays even when the keyboard on mobile shrinks the screen, not what we want*/
