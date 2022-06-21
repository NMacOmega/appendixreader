import styled from "styled-components";

export const Loader = styled.div`
  background-color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  pointer-events: none;

  ${({ isOpen }) =>
    !isOpen &&
    `* {
    display:none;
  }`}
`;
