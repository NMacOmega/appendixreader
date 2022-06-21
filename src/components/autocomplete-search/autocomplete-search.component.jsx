import { useState, useContext, useRef, useEffect } from "react";
import { MapBoxContext } from "../../contexts/mapbox.context";
import {
  SearchToolContainer,
  SearchFieldContainer,
  NoSuggestionsContainer,
  Suggestions,
  Suggestion,
  ActiveSuggestion,
  SearchTextInput,
  SearchButton,
  CaptionSpan,
  TextSpan,
} from "./autocomplete-search.styles";

import Icon from "../generic-components/Icon/icon.component";

const AutocompleteSearch = () => {
  const {
    featuresRef,
    selecteActiveFeatureOnSearch,
    isSearchMenuOpen,
    setIsSearchMenuOpen,
  } = useContext(MapBoxContext);

  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestedFeature = useRef();

  const mapShortNames = {
    "Settlement of the Promised Land": "Promised Land",
    "Conquest of the Promised Land": "Conquest",
    "Kingdom of David and Solomon": "Kingdom of David",
    "Israel During the Time of Jesus": "Time of Jesus",
  };

  useEffect(() => {
    if (!isSearchMenuOpen) setInput("");
  }, [isSearchMenuOpen]);

  const onToggleSearchHandler = () => {
    //if (isSearchMenuOpen) onSubmitHandler();
    setIsSearchMenuOpen(!isSearchMenuOpen);
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    const { current: features } = featuresRef;
    const unlinked = features.filter(
      (feature) =>
        feature.properties.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setInput(value);
    setFilteredSuggestions(unlinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClickHandler = (e) => {
    const { id, innerText } = e.target;
    if (id) {
      const activeFeature = filteredSuggestions.find((f) => f.id === id);
      suggestedFeature.current = { ...activeFeature };
      setFilteredSuggestions([]);
      setInput(innerText);
      setActiveSuggestionIndex(0);
      onSubmitHandler();
    }
  };

  const onSubmitHandler = () => {
    selecteActiveFeatureOnSearch(suggestedFeature.current);
    setShowSuggestions(false);
    setIsSearchMenuOpen(false);
    setInput("");
  };

  const getName = (feature = {}) => {
    const { properties } = feature;
    const { name } = properties ? properties : "";
    return name;
  };

  const onKeyDownHandler = (e) => {
    const { keyCode } = e;
    switch (keyCode) {
      case 13:
        const selectedFeatureEnter = filteredSuggestions[activeSuggestionIndex];
        setInput(getName(selectedFeatureEnter));
        suggestedFeature.current = {
          ...selectedFeatureEnter,
        };
        setShowSuggestions(false);
        onSubmitHandler();
        return;

      case 38:
        const newIndexUp = activeSuggestionIndex - 1;
        setActiveSuggestionIndex(newIndexUp);
        if (newIndexUp < 0) {
          setShowSuggestions(false);
        }
        const selectedFeatureUp = filteredSuggestions[newIndexUp];
        suggestedFeature.current = { ...selectedFeatureUp };
        setInput(getName(selectedFeatureUp));
        return;

      case 40:
        const newIndexDown =
          activeSuggestionIndex === filteredSuggestions.length - 1
            ? filteredSuggestions.length - 1
            : activeSuggestionIndex + 1;
        setActiveSuggestionIndex(newIndexDown);
        const selectedFeatureDown = filteredSuggestions[newIndexDown];
        suggestedFeature.current = { ...selectedFeatureDown };
        setInput(getName(selectedFeatureDown));
        if (filteredSuggestions.length > 0) setShowSuggestions(true);
        return;
      default:
        return;
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <Suggestions>
        {filteredSuggestions.map((suggestion, index) => {
          const {
            properties: { name, map },
            id,
          } = suggestion;
          const mapShortName = mapShortNames[map] || map;
          if (index === activeSuggestionIndex) {
            return (
              <ActiveSuggestion
                id={id}
                key={`sugg_${id}`}
                onClick={onClickHandler}
              >
                <TextSpan>{name}</TextSpan>
                <CaptionSpan>{mapShortName}</CaptionSpan>
              </ActiveSuggestion>
            );
          }
          return (
            <Suggestion id={id} key={`sugg_${id}`} onClick={onClickHandler}>
              <TextSpan>{name}</TextSpan>
              <CaptionSpan>{mapShortName}</CaptionSpan>
            </Suggestion>
          );
        })}
      </Suggestions>
    ) : (
      <NoSuggestionsContainer>
        <em>Oops, we couldn't find a match...</em>
      </NoSuggestionsContainer>
    );
  };

  return (
    <SearchToolContainer isOpen={isSearchMenuOpen}>
      <SearchFieldContainer>
        <SearchTextInput
          onChange={onChangeHandler}
          onClick={onClickHandler}
          onKeyDown={onKeyDownHandler}
          placeholder="Find a Feature..."
          value={input}
        />
        <SearchButton onClick={onToggleSearchHandler}>
          <Icon>search</Icon>
        </SearchButton>
      </SearchFieldContainer>
      {showSuggestions && input && <SuggestionsListComponent />}
    </SearchToolContainer>
  );
};
export default AutocompleteSearch;
