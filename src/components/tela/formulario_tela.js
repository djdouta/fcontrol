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
export default function FormularioTela(props) {
  const [tipo] = useState([
    {
      name: "Engomado",
      year: 1972
    },
    {
      name: "Vengalina",
      year: 2012
    }
  ]);
  const [textilera] = useState([
    {
      name: "Textilera 1"
    },
    {
      name: "Textilera 2"
    }
  ]);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsTextilera, setSuggestionsTextilera] = useState([]);

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : tipo.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    let newSuggestion = getSuggestions(value);
    setSuggestions(newSuggestion);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionsTextilera = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : textilera.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };
  const onSuggestionsFetchRequestedTexilera = ({ value }) => {
    let newSuggestion = getSuggestionsTextilera(value);
    setSuggestionsTextilera(newSuggestion);
  };

  const onSuggestionsClearRequestedTexilera = () => {
    setSuggestionsTextilera([]);
  };

  return (
    <Col sm="12" md="12" className="FormularioTela">
      <Button
        className="FormularioTelaAcivar "
        onClick={props.handleClik}
        data-tag={props.index}
      >
        {props.index + 1}
      </Button>

      {props.data.mostrar && (
        <Form>
          <Row form>
            <Col md="2" className="form-group">
              <label>Tipo</label>
              <Autosugerir
                handleAuto={props.handleAuto}
                value={props.data.tipo}
                index={props.index}
                suggestions={suggestions}
                getSuggestions={getSuggestions}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                name="tipo"
              />
            </Col>
            <Col md="2" className="form-group">
              <label>Color</label>
              <FormInput
                value={props.data.color}
                placeholder="Color"
                name="color"
                required
                invalid={props.data.color === "" ? true : false}
                valid={props.data.color === "" ? false : true}
                onChange={props.handleChangeData}
                data-tag={props.index}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
            <Col md="3" className="form-group">
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
              <label>Textilera</label>
              <Autosugerir
                handleAuto={props.handleAuto}
                value={props.data.textilera}
                index={props.index}
                suggestions={suggestionsTextilera}
                getSuggestions={getSuggestionsTextilera}
                onSuggestionsClearRequested={
                  onSuggestionsClearRequestedTexilera
                }
                onSuggestionsFetchRequested={
                  onSuggestionsFetchRequestedTexilera
                }
                name="textilera"
              />
            </Col>
            <Col md="2" className="form-group">
              <label>Temporada</label>
              <FormSelect
                data-tag={props.index}
                onChange={props.handleChangeData}
                valid
                name="tipo"
              >
                <option value="invierno">invierno</option>
                <option value="verano">verano</option>
              </FormSelect>
              <FormFeedback>Please select your state</FormFeedback>
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
              <label>Fecha</label>
              <FormInput
                value={props.fecha}
                type="date"
                placeholder="Fecha"
                name="fecha"
                required
                invalid={props.fecha === "" ? true : false}
                valid={props.fecha === "" ? false : true}
                onChange={props.handleChangeInput}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
            <Col md="2" className="form-group">
              <label>Remito fecha</label>
              <FormInput
                value={props.fecha_remito}
                type="date"
                placeholder="Fecha"
                name="fecha_remito"
                required
                invalid={props.fecha_remito === "" ? true : false}
                valid={props.fecha_remito === "" ? false : true}
                onChange={props.handleChangeInput}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
            <Col md="2" className="form-group">
              <label>Remito</label>
              <FormInput
                value={props.remito}
                placeholder="Remito"
                name="remito"
                required
                invalid={props.remito === "" ? true : false}
                valid={props.remito === "" ? false : true}
                onChange={props.handleChangeInput}
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
            <FormGroup className="image-upload col-md-9">
              <input
                data-tag={props.index}
                data-imagen="telaImagen"
                type="file"
                capture="camera"
                onChange={props.handleChange}
              />
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
