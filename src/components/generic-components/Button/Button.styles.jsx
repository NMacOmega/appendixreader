import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 0;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  vertical-align: center;
  width: 32px;
  height: 35px;
  border: 2px solid #cccccc; /*#4aa1eb #1da1f2 Nice blue highlight colors*/
  border-radius: 4px;
  background: #fff;
  line-height: 0.5rem;

  :hover,
  :active {
    background-color: rgb(242, 242, 242);
  }
`;
