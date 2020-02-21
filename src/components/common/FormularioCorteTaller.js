import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  FormFeedback,
  FormInput,
  ListGroupItem,
  ListGroup,
  Card
} from "shards-react";
import TableTalles from "./TableTalles";
import Encimado from "./Encimado";
import ArrayTalles from "./ArrayTalles";

export default function Corte(props) {
  const [ocultar, setOcultar] = useState(true);

  const handleShow = () => {
    setOcultar(!ocultar);
  };

  return (
    <Col sm="12" md="12" className="FormularioTela">
      <Button className="botonIcons FormularioTelaAcivar " onClick={handleShow}>
        <i className="material-icons PeddingIcon">
          {ocultar === false ? "add" : "remove"}
        </i>
      </Button>
      {ocultar === true && (
        <Form>
          <Card small className="mb-4">
            <ListGroup flush>
              <ListGroupItem className="px-3">
                <Row form>
                  <Col md="12" className="form-group">
                    <Row form>
                      <Col md="3" className="form-group">
                        <label>Articulo</label>
                        <FormInput
                          value={props.tizada.articulo}
                          placeholder="Articulo"
                          name="articulo"
                          required
                          invalid={
                            props.readOnly === true
                              ? null
                              : props.tizada.articulo === ""
                              ? true
                              : false
                          }
                          valid={
                            props.readOnly === true
                              ? null
                              : props.tizada.articulo === ""
                              ? false
                              : true
                          }
                          readOnly={props.readOnly}
                          onChange={props.handleTizada}
                          data-index={props.index}
                        />
                        <FormFeedback>Complete</FormFeedback>
                      </Col>
                      <Col md="2" className="form-group">
                        <label>Modelo</label>
                        <FormInput
                          value={props.tizada.modelo}
                          placeholder="Modelo"
                          name="modelo"
                          required
                          invalid={
                            props.readOnly === true
                              ? null
                              : props.tizada.modelo === ""
                              ? true
                              : false
                          }
                          valid={
                            props.readOnly === true
                              ? null
                              : props.tizada.modelo === ""
                              ? false
                              : true
                          }
                          readOnly={props.readOnly}
                          onChange={props.handleTizada}
                          data-index={props.index}
                        />
                        <FormFeedback>Complete</FormFeedback>
                      </Col>
                      <Col md="2" className="form-group">
                        <label>Referencia</label>
                        <FormInput
                          value={props.tizada.referencia}
                          placeholder="Referencia"
                          name="referencia"
                          required
                          invalid={
                            props.readOnly === true
                              ? null
                              : props.tizada.referencia === ""
                              ? true
                              : false
                          }
                          valid={
                            props.readOnly === true
                              ? null
                              : props.tizada.referencia === ""
                              ? false
                              : true
                          }
                          readOnly={props.readOnly}
                          onChange={props.handleTizada}
                          data-index={props.index}
                        />
                        <FormFeedback>Complete</FormFeedback>
                      </Col>
                      <Col md="2" className="form-group">
                        <label>Largo</label>
                        <FormInput
                          min="1"
                          type="number"
                          value={props.tizada.largo}
                          placeholder="Largo"
                          name="largo"
                          required
                          invalid={
                            props.readOnly === true
                              ? null
                              : props.tizada.largo === ""
                              ? true
                              : false
                          }
                          valid={
                            props.readOnly === true
                              ? null
                              : props.tizada.largo === ""
                              ? false
                              : true
                          }
                          readOnly={props.readOnly}
                          onChange={props.handleTizada}
                          data-index={props.index}
                        />
                        <FormFeedback>Complete</FormFeedback>
                      </Col>
                      <Col md="2" className="form-group">
                        <label>Ancho </label>
                        <FormInput
                          min="1"
                          type="number"
                          value={props.tizada.ancho}
                          placeholder="Ancho"
                          name="ancho"
                          required
                          invalid={
                            props.readOnly === true
                              ? null
                              : props.tizada.ancho === ""
                              ? true
                              : false
                          }
                          valid={
                            props.readOnly === true
                              ? null
                              : props.tizada.ancho === ""
                              ? false
                              : true
                          }
                          readOnly={props.readOnly}
                          onChange={props.handleTizada}
                          data-index={props.index}
                        />
                        <FormFeedback>Complete</FormFeedback>
                      </Col>
                      {props.readOnly === true ? null : (
                        <Col md="1" className="form-group">
                          <label>Agregar </label>
                          <Button
                            onClick={props.handleAddEncimado}
                            className="botonIcons"
                            data-index={props.index}
                          >
                            <i className="material-icons">add</i>
                          </Button>
                        </Col>
                      )}
                    </Row>
                    <Row form>
                      <Col md="9" className="form-group">
                        {props.tizada.encimados.map((e, i) => (
                          <Encimado
                            multiTela={props.multiTela}
                            handleAuto={props.handleAuto}
                            key={i}
                            index={props.index}
                            encimadoIndex={i}
                            encimado={e}
                            handleEncimado={props.handleEncimado}
                            handleDeleteEncimado={props.handleDeleteEncimado}
                            readOnly={props.readOnly}
                            original={props.original}
                            handleOpcionChange={props.handleOpcionChange}
                            conjunto={props.conjunto}
                            talles={props.tizada.talles}
                          />
                        ))}
                      </Col>
                      <Col md="3" className="form-group">
                        <Row form>
                          <Col md="12" className="form-group, CenterText">
                            <label>Talles</label>
                            <TableTalles
                              index={props.index}
                              // talles={props.tizada.talles}
                              handleTalles={props.handleTalles}
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="12" className="form-group, CenterText">
                            <label>Talles seleccionados</label>
                            <div>
                              {props.tizada.talles.map((talle, index) => (
                                <ArrayTalles talle={talle} key={index} />
                              ))}
                            </div>
                            <Button
                              onClick={props.handleDeleteTalles}
                              data-index={props.index}
                            >
                              {"<"}
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {props.readOnly === true || props.index === 0 ? null : (
                      <Button
                        onClick={props.handleDeleteTizada}
                        data-index={props.index}
                      >
                        Eliminar tizada
                      </Button>
                    )}
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Form>
      )}
    </Col>
  );
}
