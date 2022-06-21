import styled from "styled-components";

export const PinSpan = styled.div`
  width: 2rem;
`;

export const CloseSpan = styled.div`
  width: 2rem;
`;

export const FeatureDisplayHeadingTitle = styled.div``;

export const FeatureDisplayHeading = styled.div`
  background-color: #fff;
  width: 100%;
  min-height: 3rem;
  padding: 0.6rem;
  text-align: center;
  font-size: 1.5rem;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns:
    [c1s] 70%
    [c1e c2s] 10%
    [c2e c3s] 10%;
  grid-column-gap: 3%;
  grid-template-areas: "title pin close";
`;

export const FeatureDisplayBlob = styled.span`
  padding: 1rem 1rem 3rem 1em;
`;

export const FeatureDisplayBody = styled.div`
  padding: 0.2rem 2rem 1rem 2rem;
`;

export const FeatureDisplayBodyContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  background-color: rgb(242, 242, 242);
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const FeatureDisplayBackground = styled.div`
  width: 95vw;
  bottom: 0;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: solid #ccc;
  border-width: 4px 4px 0 4px;
  border-radius: 1.8rem 1.8rem 0 0;
  overflow: hidden;
`;

export const FeatureDisplayContainer = styled.div`
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  * {
    pointer-events: auto;
  }
`;
