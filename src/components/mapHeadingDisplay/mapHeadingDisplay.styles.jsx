import styled, { css } from "styled-components";
import { ReactComponent as ConquestTimelineSVGFile } from "../../assets/svg/timelines/timeline-conquest.svg";
import { ReactComponent as SettlementTimelineSVGFile } from "../../assets/svg/timelines/timeline-settlement.svg";
import { ReactComponent as DavidicTimeLineSVGFile } from "../../assets/svg/timelines/timeline-davidic.svg";
import { ReactComponent as JesusTimeLineSVGFile } from "../../assets/svg/timelines/timeline-Jesus.svg";

export const SVGCSS = css`
  width: 100%;
`;

export const ConquestTimelineSVG = styled(ConquestTimelineSVGFile)`
  ${SVGCSS}
`;
export const SettlementTimelineSVG = styled(SettlementTimelineSVGFile)`
  ${SVGCSS}
`;
export const DavidicTimelineSVG = styled(DavidicTimeLineSVGFile)`
  ${SVGCSS}
`;
export const JesusTimelineSVG = styled(JesusTimeLineSVGFile)`
  ${SVGCSS}
`;

export const MapHeadingBody = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin: auto;
`;

export const MapHeadingContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff90;
  padding: 0.25rem 0.25rem 0.25rem 0;

  @media (max-width: 740px) and (max-height: 375px) {
    width: 350px;

    h1:first-child {
      font-size: 1.1rem;
    }

    svg {
      position: relative;
      right: 50px;
      width: 400px;
    }
  }

  @media (min-width: 650px) {
    max-height: 150px;
    max-width: 400px;
    border-right: 2px solid #cccccc;
    border-bottom: 2px solid #cccccc;
  }

  @media (min-width: 850px) and (max-width: 999px) {
    max-width: 400px;
    width: 400px;
  }
`;
