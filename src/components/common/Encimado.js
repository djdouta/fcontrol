import React, { useState, Fragment } from "react";
import {
  Row,
  Col,
  Button,
  FormFeedback,
  FormInput,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";
import Autosugerir from "./autocompletar";
import axios from "axios";

export default function Encimado(props) {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [suggestionsRemito, setSuggestionsRemito] = useState([]);
  const [temporizador, setTemporizador] = useState(null);

  // Api search remito
  const searchRemito = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let remito = [].find(lang => lang.textilera === props.textilera);

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
    // setRemito(result.data);
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
  return (
    <Fragment>
      <Row form>
        <Col md="1" className="form-group">
          <label>.</label>
          <InputGroup className="mb-3">
            <Dropdown
              open={dropdownMenu}
              toggle={e => {
                setDropdownMenu(!dropdownMenu);
              }}
              addonType="prepend"
            >
              <DropdownToggle caret>
                {parseInt(props.encimado.conjunto) + 1}
              </DropdownToggle>
              <DropdownMenu small>
                {props.conjunto.map((e, i) => (
                  <DropdownItem
                    key={i}
                    data-index={props.index}
                    data-encimado={props.encimadoIndex}
                    data-conjunto={i}
                    onClick={props.handleOpcionChange}
                  >
                    {i + 1}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </InputGroup>
        </Col>
        <Col md="2" className="form-group">
          <label>Color</label>
          {props.readOnly === true ? (
            <FormInput
              placeholder="Color"
              name="color"
              required
              readOnly={props.readOnly}
              invalid={
                props.readOnly === true
                  ? null
                  : props.encimado.color === ""
                  ? true
                  : false
              }
              valid={
                props.readOnly === true
                  ? null
                  : props.encimado.color === ""
                  ? false
                  : true
              }
              onChange={props.readOnly === true ? null : props.handleEncimado}
              value={props.encimado.color}
              data-index={props.index}
              data-encimado={props.encimadoIndex}
            />
          ) : (
            <Autosugerir
              handleAuto={props.handleAuto}
              getSuggestionValue={getSuggestionValueRemito}
              value="2"
              index={props.index}
              suggestions={suggestionsRemito}
              getSuggestions={getSuggestionsRemito}
              onSuggestionsClearRequested={onSuggestionsClearRequestedRemito}
              onSuggestionsFetchRequested={onSuggestionsFetchRequestedRemito}
              name="remito"
            />
          )}

          {props.readOnly === true ? null : (
            <FormFeedback>Complete</FormFeedback>
          )}
        </Col>
        <Col md="2" className="form-group">
          <label>Cantidad</label>
          <FormInput
            step="1"
            pattern="\d*"
            type="number"
            value={
              props.readOnly === true
                ? props.encimado.cantidad_stock
                : props.encimado.cantidad
            }
            placeholder="Cantidad"
            name="cantidad"
            required
            invalid={props.encimado.cantidad === "" ? true : false}
            valid={props.encimado.cantidad === "" ? false : true}
            onChange={
              props.readOnly === true
                ? props.original.numero === undefined
                  ? () => {}
                  : props.handleEncimado
                : props.handleEncimado
            }
            data-index={props.index}
            data-encimado={props.encimadoIndex}
          />
          <FormFeedback>Complete</FormFeedback>
        </Col>
        <Col md="2" className="form-group">
          <label>Metros</label>
          <FormInput
            min="1"
            readOnly={props.readOnly}
            max={props.encimado.metros}
            type="number"
            value={
              props.readOnly === true
                ? props.encimado.metros_stock
                : props.encimado.metros
            }
            placeholder="Metros"
            name="metros"
            required
            invalid={props.encimado.metros === "" ? true : false}
            valid={props.encimado.metros === "" ? false : true}
            onChange={props.readOnly === true ? null : props.handleEncimado}
            data-index={props.index}
            data-encimado={props.encimadoIndex}
          />
          <FormFeedback>Complete</FormFeedback>
        </Col>
      </Row>
      {props.readOnly === true ? null : (
        <Row form>
          <Col md="1" className="form-group">
            <label>.</label>
          </Col>
          <Col md="2" className="form-group">
            <label>Kilos</label>
            <FormInput
              min="1"
              readOnly={props.readOnly}
              max={props.encimado.kilos}
              type="number"
              value={
                props.readOnly === true
                  ? props.encimado.kilos_stock
                  : props.encimado.kilos
              }
              placeholder="Kilos"
              name="kilos"
              required
              invalid={props.encimado.kilos === "" ? true : false}
              valid={props.encimado.kilos === "" ? false : true}
              onChange={props.readOnly === true ? null : props.handleEncimado}
              data-index={props.index}
              data-encimado={props.encimadoIndex}
            />
            <FormFeedback>Complete</FormFeedback>
          </Col>
          <Col md="2" className="form-group">
            <label>m. sobra</label>
            <FormInput
              min="1"
              readOnly={props.readOnly}
              max={props.encimado.sobra}
              type="number"
              value={props.encimado.sobra}
              placeholder="Sobra"
              name="sobra"
              required
              invalid={props.encimado.sobra === "" ? true : false}
              valid={props.encimado.sobra === "" ? false : true}
              onChange={props.readOnly === true ? null : props.handleEncimado}
              data-index={props.index}
              data-encimado={props.encimadoIndex}
            />
            <FormFeedback>Complete</FormFeedback>
          </Col>
          <Col md="2" className="form-group">
            <label>Falta</label>
            <FormInput
              min="1"
              readOnly={props.readOnly}
              max={props.encimado.kilos}
              type="number"
              value={props.encimado.falta}
              placeholder="Falta"
              name="falta"
              required
              invalid={props.encimado.falta === "" ? true : false}
              valid={props.encimado.falta === "" ? false : true}
              onChange={props.readOnly === true ? null : props.handleEncimado}
              data-index={props.index}
              data-encimado={props.encimadoIndex}
            />
            <FormFeedback>Complete</FormFeedback>
          </Col>
          {props.readOnly === true || props.encimadoIndex === 0 ? null : (
            <Col md="1" className="form-group">
              <label>Eliminar </label>
              <Button
                className="botonIcons"
                data-index={props.index}
                data-encimado={props.encimadoIndex}
                onClick={props.handleDeleteEncimado}
              >
                <i className="material-icons">delete</i>
              </Button>
            </Col>
          )}
        </Row>
      )}
    </Fragment>
  );
}
