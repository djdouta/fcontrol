import React from "react";
import { Row, Col, Button, FormFeedback, FormInput } from "shards-react";
export default function Encimado(props) {
  return (
    <Row form>
      <Col md="2" className="form-group">
        <label>Color</label>
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
        {props.readOnly === true ? null : <FormFeedback>Complete</FormFeedback>}
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
  );
}
