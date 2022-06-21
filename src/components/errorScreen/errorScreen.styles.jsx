import styled from "styled-components";

export const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.3rem;

  .material-icons {
    font-size: 5rem;
    margin: 0 10px;
    color: #c7225e;
  }
`;

export const ErrorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  background: #fff;
  display: flex;
  align-items: flex-start;
  padding-top: 40px;
  justify-content: center;
`;
