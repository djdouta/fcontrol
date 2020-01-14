import React from "react";
import Autosuggest from "react-autosuggest";
import "../../assets/autocompletar.css";

export default function Autocompletar(props) {
  const getSuggestionValue = suggestion => suggestion.name;
  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  const inputProps = {
    placeholder: "Tipo",
    value: props.value,
    onChange: (e, { newValue }) =>
      props.handleAuto(
        e,
        { newValue },
        { index: props.index },
        { tipo: props.name }
      )
  };

  return (
    <Autosuggest
      suggestions={props.suggestions}
      onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={props.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      data-tag={2}
    />
  );
}

//Malerore , presenti perfrto,
