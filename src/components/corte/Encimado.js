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
          invalid={props.encimado.color === "" ? true : false}
          valid={props.encimado.color === "" ? false : true}
          onChange={props.hadleEncimado}
          value={props.encimado.color}
          data-index={props.index}
          data-encimado={props.encimadoIndex}
        />
        <FormFeedback>Complete</FormFeedback>
      </Col>
      <Col md="2" className="form-group">
        <label>Cantidad</label>
        <FormInput
          value={props.encimado.cantidad}
          placeholder="Cantidad"
          name="cantidad"
          required
          invalid={props.encimado.cantidad === "" ? true : false}
          valid={props.encimado.cantidad === "" ? false : true}
          onChange={props.hadleEncimado}
          data-index={props.index}
          data-encimado={props.encimadoIndex}
        />
        <FormFeedback>Complete</FormFeedback>
      </Col>
      <Col md="2" className="form-group">
        <label>Metros</label>
        <FormInput
          min="1"
          type="number"
          value={props.encimado.metros}
          placeholder="Metros"
          name="metros"
          required
          invalid={props.encimado.metros === "" ? true : false}
          valid={props.encimado.metros === "" ? false : true}
          onChange={props.hadleEncimado}
          data-index={props.index}
          data-encimado={props.encimadoIndex}
        />
        <FormFeedback>Complete</FormFeedback>
      </Col>
      <Col md="2" className="form-group">
        <label>Kilos</label>
        <FormInput
          min="1"
          type="number"
          value={props.encimado.kilos}
          placeholder="Kilos"
          name="kilos"
          required
          invalid={props.encimado.kilos === "" ? true : false}
          valid={props.encimado.kilos === "" ? false : true}
          onChange={props.hadleEncimado}
          data-index={props.index}
          data-encimado={props.encimadoIndex}
        />
        <FormFeedback>Complete</FormFeedback>
      </Col>
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
    </Row>
  );
}
