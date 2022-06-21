import styled, { css } from "styled-components";
import Button from "../generic-components/Button/Button.component";

const slideInTranslate = css`
  transform: translateX(0);
  transition: all 0.6s ease-out;
`;

const slideOutTranslate = css`
  transform: translateX(81%);
  transition: all 0.5s ease-in;
`;

export const OpenLayerMenuButtonComponent = styled(Button)`
  width: 15%;
  height: 28%;
  border-radius: 10px 0 0 10px;
  pointer-events: auto;
  :hover,
  :active {
    background-color: rgb(242, 242, 242);
  }
  @media (max-height: 760px) {
    width: 3rem;
  }
`;

export const ButtonTextSpan = styled.span`
  line-height: 1.5;
  font-size: 1rem;
`;

export const LayerChoiceButton = styled(Button)`
  width: 75%;
  height: 15%;
  ${({ highlight }) => highlight && "border: 1px dotted red"};

  :hover,
  :active {
    background-color: #c2c070;
    border: 1px solid red;
  }

  @media (max-height: 599px) and (min-width: 500px) {
    width: 140px;
    height: 80px;
  }
`;

export const LayerMenuComponent = styled.div`
  display: flex;
  background-color: rgb(242, 242, 242);
  border: 2px solid #cccccc; /*#4aa1eb #1da1f2 Nice blue highlight colors*/
  border-radius: 40px 0 0 40px;
  height: 98%;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  pointer-events: auto;
  @media (max-height: 599px) and (min-width: 500px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const LayerMenuInnerContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  ${({ isOpen }) => (isOpen ? slideInTranslate : slideOutTranslate)};
`;

export const LayerMenuOuterContainer = styled.div`
  position: absolute;
  right: 0;
  top: 30vh;
  width: 16rem;
  height: 28rem;
  overflow: hidden;
  pointer-events: none;

  @media (min-height: 599px) and (max-height: 620px) and (min-width: 500px) {
    top: 18%;
  }

  @media (max-height: 599px) and (min-width: 500px) {
    height: 70%;
    width: 30rem;
    top: 20%;
  }
`;
