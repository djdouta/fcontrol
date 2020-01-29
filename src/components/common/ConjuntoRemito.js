import React from "react";
import { Col, FormFeedback, FormInput, Button, Row } from "shards-react";
import "../../assets/conjuntoRemito.css";

export default function ConjuntoRemito(props) {
  return (
    <Row form>
      <Col md="1" className="form-group">
        <label> </label>
        <div className="ConjuntoRemito"> {props.index + 1} </div>
      </Col>

      <Col md="2" className="form-group">
        <label>Remito </label>
        <FormInput
          data-index={props.index}
          value={props.remito}
          placeholder="Remito"
          name="remito"
          required
          invalid={props.remito === "" ? true : false}
          valid={props.remito === "" ? false : true}
          onChange={props.handleChangeRemitoConjunto}
        />
        <FormFeedback>Complete</FormFeedback>
      </Col>
      <Col md="3" className="form-group">
        <label>Textilera </label>
        <FormInput
          data-index={props.index}
          value={props.textilera}
          placeholder="Textilera"
          name="textilera"
          required
          invalid={props.textilera === "" ? true : false}
          valid={props.textilera === "" ? false : true}
          onChange={props.handleChangeRemitoConjunto}
        />
        <FormFeedback>Complete</FormFeedback>
      </Col>
      <Col md="3" className="form-group">
        <label>Tela</label>
        <FormInput
          data-index={props.index}
          value={props.tela}
          placeholder="Tela"
          name="tela"
          required
          invalid={props.tela === "" ? true : false}
          valid={props.tela === "" ? false : true}
          onChange={props.handleChangeRemitoConjunto}
        />
        <FormFeedback>Complete</FormFeedback>
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
