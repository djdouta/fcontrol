import React, { useState } from "react";
import { Col, Button, Row, FormInput } from "shards-react";
import Autosugerir from "./autocompletar";
import "../../assets/conjuntoRemito.css";
import axios from "axios";
export default function ConjuntoRemito(props) {
  const [suggestionsRemito, setSuggestionsRemito] = useState([]);
  const [suggestionsTextilera, setSuggestionsTextilera] = useState([]);
  const [suggestionsTela, setSuggestionsTela] = useState([]);
  const [temporizador, setTemporizador] = useState(null);
  const [remitos, setRemito] = useState([]);

  // Api search remito
  const searchRemito = async remito => {
    const result = await axios("/tela/remito", {
      params: {
        remito
      }
    });
    return result;
  };

  //Buscar coincidencias de textilera
  const searchTextilera = textilera => {
    const inputValue = textilera.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : remitos.filter(
          remito =>
            remito.textilera.toLowerCase().slice(0, inputLength) ===
              inputValue && remito.remito === props.remito
        );
  };

  //Buscar coincidencias de tela
  const searchTela = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let remito = remitos.find(lang => lang.textilera === props.textilera);

    let tela =
      inputLength === 0
        ? []
        : remito.datos.filter(
            lang => lang.tipo.toLowerCase().slice(0, inputLength) === inputValue
          );

    let telasArray = tela.map(e => {
      return e.tipo;
    });
    let uniq = [...new Set(telasArray)];
    let final = uniq.map(e => {
      return {
        tipo: e
      };
    });
    return final;
  };
  //Autogest tipo
  const getSuggestionsRemito = async value => {
    const result = await searchRemito(value);
    setRemito(result.data);
    let nuevo = result.data.map(element => {
      return { name: element.remito };
    });
    return nuevo;
  };
  const onSuggestionsFetchRequestedRemito = async ({ value }) => {
    if (temporizador !== null) {
      window.clearTimeout(temporizador);
    }
    let temporizadorID = window.setTimeout(async () => {
      let newSuggestion = await getSuggestionsRemito(value);

      setSuggestionsRemito(newSuggestion);
    }, 200);
    setTemporizador(temporizadorID);
  };

  const onSuggestionsClearRequestedRemito = () => {
    setSuggestionsRemito([]);
  };
  const getSuggestionValueRemito = suggestion => {
    // let realRemito = remitos.filter(e => e.remito === suggestion.name);
    // setRemito(realRemito);

    return suggestion.name;
  };

  //Autogest textilera
  const getSuggestionsTextilera = value => {
    const result = searchTextilera(value);
    let nuevo = result.map(element => {
      return { name: element.textilera };
      //pendiente
    });
    return nuevo;
  };
  const onSuggestionsFetchRequestedTextilera = async ({ value }) => {
    if (temporizador !== null) {
      window.clearTimeout(temporizador);
    }
    let temporizadorID = window.setTimeout(async () => {
      let newSuggestion = await getSuggestionsTextilera(value);
      setSuggestionsTextilera(newSuggestion);
    }, 200);
    setTemporizador(temporizadorID);
  };

  const onSuggestionsClearRequestedTextilera = () => {
    setSuggestionsRemito([]);
  };
  const getSuggestionValueTextilera = suggestion => {
    props.handleOrginal("hola");
    // props.handleCodigo(suggestion, "tipo", props.index);
    return suggestion.name;
  };

  //Autogest tela
  const getSuggestionsTela = value => {
    const result = searchTela(value);
    let nuevo = result.map(element => {
      return { name: element.tipo };
      //pendiente
    });
    return nuevo;
  };
  const onSuggestionsFetchRequestedTela = async ({ value }) => {
    if (temporizador !== null) {
      window.clearTimeout(temporizador);
    }
    let temporizadorID = window.setTimeout(async () => {
      let newSuggestion = await getSuggestionsTela(value);
      setSuggestionsTela(newSuggestion);
    }, 200);
    setTemporizador(temporizadorID);
  };

  const onSuggestionsClearRequestedTela = () => {
    setSuggestionsTela([]);
  };
  const getSuggestionValueTela = suggestion => {
    // props.handleCodigo(suggestion, "tipo", props.index);
    return suggestion.name;
  };

  return (
    <Row form>
      <Col md="1" className="form-group">
        <label> </label>
        <div className="ConjuntoRemito"> {props.index + 1} </div>
      </Col>
      <Col md="3" className="form-group">
        <label>Remito </label>
        <Autosugerir
          handleAuto={props.handleAuto}
          getSuggestionValue={getSuggestionValueRemito}
          value={props.remito}
          index={props.index}
          suggestions={suggestionsRemito}
          getSuggestions={getSuggestionsRemito}
          onSuggestionsClearRequested={onSuggestionsClearRequestedRemito}
          onSuggestionsFetchRequested={onSuggestionsFetchRequestedRemito}
          data={remitos}
          name="remito"
        />
      </Col>
      <Col md="3" className="form-group">
        <label>Textilera </label>
        {props.readOnly === true &&
        props.multiRemitos[props.index].length === 0 ? (
          <FormInput
            data-index={props.index}
            value={props.textilera}
            placeholder="Textilera"
            name="textilera"
            required
            invalid={props.textilera === "" ? true : false}
            valid={props.textilera === "" ? false : true}
            readOnly={props.readOnly}
            onChange={props.handleChangeRemitoConjunto}
          />
        ) : (
          <Autosugerir
            handleAuto={props.handleAuto}
            getSuggestionValue={getSuggestionValueTextilera}
            value={props.textilera}
            index={props.index}
            suggestions={suggestionsTextilera}
            getSuggestions={getSuggestionsTextilera}
            onSuggestionsClearRequested={onSuggestionsClearRequestedTextilera}
            onSuggestionsFetchRequested={onSuggestionsFetchRequestedTextilera}
            name="textilera"
            data={remitos}
          />
        )}
      </Col>
      <Col md="3" className="form-group">
        <label>Tela </label>
        {props.readOnly === true &&
        props.multiTextilera[props.index].length === 0 ? (
          <FormInput
            data-index={props.index}
            value={props.tela}
            placeholder="tela"
            name="tela"
            required
            invalid={props.tela === "" ? true : false}
            valid={props.tela === "" ? false : true}
            readOnly={props.readOnly}
            onChange={props.handleChangeRemitoConjunto}
          />
        ) : (
          <Autosugerir
            handleAuto={props.handleAuto}
            getSuggestionValue={getSuggestionValueTela}
            value={props.tela}
            index={props.index}
            suggestions={suggestionsTela}
            getSuggestions={getSuggestionsTela}
            onSuggestionsClearRequested={onSuggestionsClearRequestedTela}
            onSuggestionsFetchRequested={onSuggestionsFetchRequestedTela}
            name="tela"
            data={remitos}
          />
        )}
      </Col>

      {props.index === 0 ? null : (
        <Col md="1" className="form-group">
          <label>Agregar </label>
          <Button
            data-index={props.index}
            className="botonIcons"
            onClick={props.handleDeleteRemitoConjunto}
          >
            <i className="material-icons">delete</i>
          </Button>
        </Col>
      )}
    </Row>
  );
}
