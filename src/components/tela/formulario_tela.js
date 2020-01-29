import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  FormInput,
  FormSelect,
  Button,
  FormCheckbox
} from "shards-react";
import "../../assets/formulario_tela.css";
import Autosugerir from "../common/autocompletar.js";
import axios from "axios";
export default function FormularioTela(props) {
  const [suggestionsTipo, setSuggestionsTipo] = useState([]);
  const [suggestionsColor, setSuggestionsColor] = useState([]);
  const [temporizador, setTemporizador] = useState(null);

  //Busqueda api rest
  const searchTipo = async code => {
    const cut = await axios("/tipoTela/find", {
      params: {
        nombre: code
      }
    });

    return cut;
  };
  //Busqueda api rest
  const searchColor = async code => {
    const color = await axios("/colorTela/find", {
      params: {
        nombre: code
      }
    });

    return color;
  };

  //Autogest tipo
  const getSuggestionsTipo = async value => {
    const result = await searchTipo(value);
    let nuevo = result.data.map(element => {
      return { name: element.name };
    });
    return nuevo;
  };
  const onSuggestionsFetchRequestedTipo = async ({ value }) => {
    if (temporizador !== null) {
      window.clearTimeout(temporizador);
    }
    let temporizadorID = window.setTimeout(async () => {
      let newSuggestion = await getSuggestionsTipo(value);

      setSuggestionsTipo(newSuggestion);
    }, 200);
    setTemporizador(temporizadorID);
  };

  const onSuggestionsClearRequestedTipo = () => {
    setSuggestionsTipo([]);
  };
  const getSuggestionValueTipo = suggestion => {
    return suggestion.name;
  };

  //Autogest color
  const getSuggestionsColor = async value => {
    const result = await searchColor(value);
    let nuevo = result.data.map(element => {
      return { name: element.name };
    });
    return nuevo;
  };
  const onSuggestionsFetchRequestedColor = async ({ value }) => {
    if (temporizador !== null) {
      window.clearTimeout(temporizador);
    }
    let temporizadorID = window.setTimeout(async () => {
      let newSuggestion = await getSuggestionsColor(value);

      setSuggestionsColor(newSuggestion);
    }, 200);
    setTemporizador(temporizadorID);
  };

  const onSuggestionsClearRequestedColor = () => {
    setSuggestionsColor([]);
  };
  const getSuggestionValueColor = suggestion => {
    return suggestion.name;
  };

  return (
    <Col sm="12" md="12" className="FormularioTela">
      <Button
        className="FormularioTelaAcivar "
        onClick={props.handleShow}
        data-tag={props.index}
      >
        {props.index + 1}
      </Button>

      {props.data.mostrar && (
        <Form>
          <Row form>
            <Col md="3" className="form-group">
              <label>Tipo</label>
              <Autosugerir
                handleAuto={props.handleAuto}
                value={props.data.tipo}
                index={props.index}
                suggestions={suggestionsTipo}
                getSuggestions={getSuggestionsTipo}
                getSuggestionValue={getSuggestionValueTipo}
                onSuggestionsClearRequested={onSuggestionsClearRequestedTipo}
                onSuggestionsFetchRequested={onSuggestionsFetchRequestedTipo}
                name="tipo"
              />
            </Col>
            <Col md="2" className="form-group">
              <label>Color</label>
              <Autosugerir
                handleAuto={props.handleAuto}
                value={props.data.color}
                index={props.index}
                suggestions={suggestionsColor}
                getSuggestions={getSuggestionsColor}
                getSuggestionValue={getSuggestionValueColor}
                onSuggestionsClearRequested={onSuggestionsClearRequestedColor}
                onSuggestionsFetchRequested={onSuggestionsFetchRequestedColor}
                name="color"
              />
            </Col>
            <Col md="4" className="form-group">
              <label>Descripcion</label>
              <FormInput
                value={props.data.descripcion}
                placeholder="Descripcion"
                name="descripcion"
                required
                invalid={props.data.descripcion === "" ? true : false}
                valid={props.data.descripcion === "" ? false : true}
                onChange={props.handleChangeData}
                data-tag={props.index}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>

            <Col md="2" className="form-group">
              <label>Temporada</label>
              <FormSelect
                data-tag={props.index}
                onChange={props.handleChangeData}
                valid
                name="temporada"
              >
                <option value="invierno">Invierno</option>
                <option value="verano">Verano</option>
              </FormSelect>
            </Col>
            <Col md="1" className="form-group">
              <label>Estampado</label>
              <FormCheckbox
                data-tag={props.index}
                toggle
                onChange={props.handleChangeData}
                name="estampado"
                defaultChecked={props.data.estampado}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
          </Row>
          <Row form>
            <Col md="2" className="form-group">
              <label>Metros totales</label>
              <FormInput
                value={props.data.metros}
                placeholder="Metros"
                name="metros"
                required
                invalid={props.data.metros === "" ? true : false}
                valid={props.data.metros === "" ? false : true}
                onChange={props.handleChangeData}
                type="number"
                data-tag={props.index}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
            <Col md="2" className="form-group">
              <label>Cantidad de Rollos</label>
              <FormInput
                value={props.data.rollos}
                placeholder="Rollos"
                name="rollos"
                required
                invalid={props.data.rollos === "" ? true : false}
                valid={props.data.rollos === "" ? false : true}
                onChange={props.handleChangeData}
                type="number"
                data-tag={props.index}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>

            <Col md="2" className="form-group">
              <label>Codigo</label>
              <FormInput
                readOnly
                value={props.data.codigo}
                placeholder="Codigo"
                name="codigo"
                required
                invalid={props.data.codigo === "" ? true : false}
                valid={props.data.codigo === "" ? false : true}
                data-tag={props.index}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
            {props.index === 0 ? null : (
              <Col md="2" className="form-group">
                <label>Eliminar esta tela</label>
                <Button data-index={props.index} onClick={props.handleDelete}>
                  Eliminar
                </Button>
                <FormFeedback>Complete</FormFeedback>
              </Col>
            )}

            <FormGroup className="image-upload col-md-9">
              <input
                data-tag={props.index}
                data-imagen="telaImagen"
                type="file"
                capture="camera"
                onChange={props.handleChange}
              />
              <h3>Foto de la tela</h3>
              <img
                className="FormValidationImg"
                onClick={props.handleClick}
                src={props.data.telaImagen}
                accept="image/*"
                alt="Imagen de tela."
                multiple={false}
              />
            </FormGroup>
            <Col md="3" className="form-group align-end image-upload">
              <input
                data-tag={props.index}
                data-imagen="factura"
                type="file"
                capture="camera"
                onChange={props.handleChange}
              />
              <h3>Foto de factura</h3>
              <img
                className="FormValidationImg"
                onClick={props.handleClick}
                src={props.data.factura}
                accept="image/*"
                alt="Imagen de tela."
                multiple={false}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
          </Row>
        </Form>
      )}
    </Col>
  );
}
