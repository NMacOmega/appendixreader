import styled, { css } from "styled-components";
import { ReactComponent as ConquestLegendSVGFile } from "../../assets/svg/legends/legends-conquest.svg";
import { ReactComponent as SettlementLegendSVGFile } from "../../assets/svg/legends/legends-settlement.svg";
import { ReactComponent as DavidicLegendSVGFile } from "../../assets/svg/legends/legends-davidic.svg";
import { ReactComponent as JesusLegendSVGFile } from "../../assets/svg/legends/legends-Jesus.svg";
import { ReactComponent as ConquestLegendLandscapeSVGFile } from "../../assets/svg/legends/legends-conquest-landscape.svg";
import { ReactComponent as SettlementLegendLandscapeSVGFile } from "../../assets/svg/legends/legends-settlement-landscape.svg";
import { ReactComponent as DavidicLegendLandscapeSVGFile } from "../../assets/svg/legends/legends-davidic-landscape.svg";
import { ReactComponent as JesusLegendLandscapeSVGFile } from "../../assets/svg/legends/legends-Jesus-landscape.svg";

export const SVGCSS = css`
  height: 100%;
  max-width: 100%;
`;

export const ConquestLegendSVG = styled(ConquestLegendSVGFile)`
  ${SVGCSS}
`;
export const SettlementLegendSVG = styled(SettlementLegendSVGFile)`
  ${SVGCSS}
`;
export const DavidicLegendSVG = styled(DavidicLegendSVGFile)`
  ${SVGCSS}
`;
export const JesusLegendSVG = styled(JesusLegendSVGFile)`
  ${SVGCSS}
`;

export const ConquestLegendLandscapeSVG = styled(
  ConquestLegendLandscapeSVGFile
)`
  ${SVGCSS}
`;
export const SettlementLegendLandscapeSVG = styled(
  SettlementLegendLandscapeSVGFile
)`
  ${SVGCSS}
`;
export const DavidicLegendLandscapeSVG = styled(DavidicLegendLandscapeSVGFile)`
  ${SVGCSS}
`;
export const JesusLegendLandscapeSVG = styled(JesusLegendLandscapeSVGFile)`
  ${SVGCSS}
`;

export const LegendContainer = styled.div`
  position: absolute;
  overflow: hidden;
  height: 400px;
  width: 300px;
  background-color: #ffffff80;
  bottom: 4rem;
  left: 5px;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0%")};
  pointer-events: none;

  @media (min-width: 700px) and (min-height: 1000px) {
    bottom: 25vh;
    height: 30rem;
  }

  @media (min-width: 1000px) and (min-height: 600px) {
    bottom: 5px;
    left: 12rem;
    height: 28rem;
    width: 23rem;
  }

  @media screen and (orientation: landscape) {
    @media (max-width: 999px) {
      height: 15rem;
      width: 25rem;
      bottom: 0;
      left: 10rem;
    }
  }
`;
