import React from "react";
import Autosuggest from "react-autosuggest";

export default function Autocompletar(props) {
  const verdadero = {
    container: {
      position: "relative"
    },
    suggestionHighlighted: {
      backgroundColor: "#ddd"
    },
    inputFocused: {
      outline: "none"
    },
    input: {
      padding: "4px 31px 7px 12px",
      fontWeight: 300,
      border: "1px solid #aaa",
      borderRadius: "4px",
      width: "100%",
      borderColor: "#17c671",
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right calc(0.375em + 0.1875rem) center",
      backgroundSize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)"
    },
    inputOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightradius: 0
    },
    suggestion: {
      cursor: "pointer",
      padding: "7px 20px"
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: "none"
    },
    suggestionsContainer: {
      display: "none"
    },
    suggestionsContainerOpen: {
      display: "block",
      position: "absolute",
      top: "35px",
      width: "100%",
      border: "1px solid #aaa",
      backgroundColor: "#fff",
      fontWeight: 300,
      borderBottomLeftRadius: "4px",
      borderBottomRightradius: "4px",
      zIndex: 2
    }
  };

  const falso = {
    container: {
      position: "relative"
    },
    suggestionHighlighted: {
      backgroundColor: "#ddd"
    },
    inputFocused: {
      outline: "none"
    },
    input: {
      padding: "4px 31px 7px 12px",
      fontWeight: 300,
      border: "1px solid #aaa",
      borderRadius: "4px",
      width: "100%",
      borderColor: "#dc3545",
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right calc(0.375em + 0.1875rem) center",
      backgroundSize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)"
    },
    inputOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightradius: 0
    },
    suggestion: {
      cursor: "pointer",
      padding: "7px 20px"
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: "none"
    },
    suggestionsContainer: {
      display: "none"
    },
    suggestionsContainerOpen: {
      display: "block",
      position: "absolute",
      top: "35px",
      width: "100%",
      border: "1px solid #aaa",
      backgroundColor: "#fff",
      fontWeight: 300,
      borderBottomLeftRadius: "4px",
      borderBottomRightradius: "4px",
      zIndex: 2
    }
  };

  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;
  const inputProps = {
    placeholder: props.name,
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
      getSuggestionValue={props.getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={props.value ? verdadero : falso}
    />
  );
}

//Malerore , presenti perfrto,
