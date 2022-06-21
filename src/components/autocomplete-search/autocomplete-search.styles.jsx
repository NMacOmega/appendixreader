import styled, { css } from "styled-components";
import TextInput from "../generic-components/text-input/text-input.component";
import Button from "../generic-components/Button/Button.component";

const activeLiStyle = css`
  color: #1da1f2;
  cursor: pointer;
  font-weight: 700;
`;

const searchToolMaxWidth = "345px";
const searchButtonWidth = "60px";
const searchContainerMaxWidth = `calc(${searchToolMaxWidth} - ${searchButtonWidth})`;
const searchFieldWidthCalc = `calc(${searchContainerMaxWidth} - ${searchButtonWidth})`;
const suggestionsWidth = `calc(${searchContainerMaxWidth} - 0.25rem)`;

const slideInTranslate = css`
  transform: translateX(0);
  transition: all 0.3s ease-out;
`;

const slideOutTranslate = css`
  transform: translateX(-230px);
  transition: all 0.5s ease-in;
`;

export const TextSpan = styled.span`
  flex-grow: 0;
  pointer-events: none;
`;

export const CaptionSpan = styled.span`
  margin: 0 4px;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: 500;
  color: #fff;
  background-color: silver;
  border-radius: 2px;
  pointer-events: none;

  flex-grow: 0;
  self-justify: flex-end;
`;

export const Suggestion = styled.li`
  padding: 0.5rem 0.2rem 0.5rem 2rem;
  background-color: #fff;

  :hover {
    ${activeLiStyle}
    color: #fff;
    background-color: #1da1f2;
  }

  :not(:last-of-type) {
    border-bottom: 1px solid #999;
  }
  display: flex;
  justify-content: space-between;
`;

export const ActiveSuggestion = styled(Suggestion)`
  ${activeLiStyle}
`;

export const Suggestions = styled.ul`
  border: 1px solid #999;

  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;

  padding-left: 0;
  width: ${suggestionsWidth};

  border-radius: 0 0 20px 20px;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const SearchTextInput = styled(TextInput)`
  width: ${searchFieldWidthCalc};
`;

export const SearchButton = styled(Button)`
  ${`width: ${searchButtonWidth};`}
  height: 60px;
  border-radius: 0 20px 20px 0;
  border-left: none;
`;

export const NoSuggestionsContainer = styled.div`
  color: #999;
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 0 0 20px 20px;
`;

export const SearchFieldContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: row;
`;

export const SearchToolContainer = styled.div`
  display: flex;
  max-width: ${searchContainerMaxWidth};
  flex-direction: column;
  align-items: start;
  position: absolute;
  left: 0;
  top: 8.8rem;
  ${({ isOpen }) => (isOpen ? slideInTranslate : slideOutTranslate)};

  @media (min-width: 850px) and (min-height: 750px),
    (min-height: 750px) and (min-width: 700px) {
    top: 200px;
  } ;
`;
