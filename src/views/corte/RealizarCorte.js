import React, { useState } from "react";
import {
  Row,
  Col,
  FormFeedback,
  FormInput,
  ListGroupItem,
  ListGroup,
  CardHeader,
  Card,
  Button
} from "shards-react";
import FormularioCorte from "../../components/corte/FormularioCorte";

export default function Corte() {
  const [corte, setCorte] = useState({
    numero: "12",
    encimador: "Dan y Yorga",
    fecha: "20/06/2010",
    cortador: "Dan",
    textilera: "ouo",
    tela: "Morley Finito",
    tizada: [
      {
        articulo: "io-015/MF",
        modelo: "Polera",
        referencia: "tablas",
        largo: 1.55,
        ancho: 1.37,
        talles: {
          uno: {
            valor: 1,
            activo: false
          },
          dos: {
            valor: 2,
            activo: false
          },
          tres: {
            valor: 3,
            activo: false
          },
          cuatro: {
            valor: 4,
            activo: false
          },
          cinco: {
            valor: 5,
            activo: false
          },
          seis: {
            valor: 6,
            activo: false
          },
          unico: {
            valor: "unico",
            activo: true
          }
        },
        encimados: [
          { color: "coral", cantidad: 20, metros: 40, kilos: 10.5 },
          { color: "verde", cantidad: 11, metros: 20, kilos: 5.8 }
        ]
      },
      {
        articulo: "io-015/MF",
        modelo: "Polera",
        referencia: "tablas",
        largo: 1.67,
        ancho: 1.27,
        talles: {
          uno: {
            valor: 1,
            activo: true
          },
          dos: {
            valor: 2,
            activo: true
          },
          tres: {
            valor: 3,
            activo: true
          },
          cuatro: {
            valor: 4,
            activo: true
          },
          cinco: {
            valor: 5,
            activo: true
          },
          seis: {
            valor: 6,
            activo: true
          },
          unico: {
            valor: "unico",
            activo: false
          }
        },
        encimados: [
          { color: "gris", cantidad: 30, metros: 51.6, kilos: 14.7 },
          { color: "blanco", cantidad: 20, metros: 34.4, kilos: 9.8 }
        ]
      }
    ]
  });
  const handlePrincipal = e => {
    let name = e.target.name;
    let value = e.target.value;
    setCorte({ ...corte, [name]: value });
  };
  const handleAddTizada = () => {
    let nuevaTizada = {
      articulo: "",
      modelo: "",
      referencia: "",
      largo: "",
      ancho: "",
      talles: {
        uno: {
          valor: 1,
          activo: false
        },
        dos: {
          valor: 2,
          activo: false
        },
        tres: {
          valor: 3,
          activo: false
        },
        cuatro: {
          valor: 4,
          activo: false
        },
        cinco: {
          valor: 5,
          activo: false
        },
        seis: {
          valor: 6,
          activo: false
        },
        unico: {
          valor: "unico",
          activo: true
        }
      },
      encimados: [{ color: "", cantidad: "", metros: "", kilos: "" }]
    };

    setCorte({ ...corte, tizada: [...corte.tizada, nuevaTizada] });
  };
  const handleDeleteTizada = e => {
    let dataSetIndex = e.target.dataset.index;
    let tizada = [...corte.tizada];
    tizada.splice(dataSetIndex, 1);
    setCorte({ ...corte, tizada: tizada });
  };
  const handleTizada = e => {
    let target = e.target.name;
    let value = e.target.value;
    let index = e.target.dataset.index;

    corte.tizada[index] = { ...corte.tizada[index], [target]: value };

    setCorte({ ...corte });
  };
  const handleTalles = e => {
    let indexTizada = e.target.dataset.index;
    let valor = e.target.dataset.valor;
    let activo = e.target.dataset.activo;
    let talle = e.target.dataset.talle;

    let newTalle = {};
    Object.keys(corte.tizada[indexTizada].talles).forEach((key, index) => {
      if (key === talle) {
        if (key === "unico") {
          if (activo === "true") {
            newTalle = {
              ...corte.tizada[indexTizada].talles,
              unico: { valor: "unico", activo: false }
            };
          } else {
            newTalle = {
              uno: {
                valor: 1,
                activo: false
              },
              dos: {
                valor: 2,
                activo: false
              },
              tres: {
                valor: 3,
                activo: false
              },
              cuatro: {
                valor: 4,
                activo: false
              },
              cinco: {
                valor: 5,
                activo: false
              },
              seis: {
                valor: 6,
                activo: false
              },
              unico: { valor: "unico", activo: true }
            };
          }
        } else {
          if (activo === "true") {
            newTalle = {
              ...corte.tizada[indexTizada].talles,
              [talle]: { valor: valor, activo: false }
            };
          } else {
            newTalle = {
              ...corte.tizada[indexTizada].talles,
              [talle]: { valor: valor, activo: true },
              unico: { valor: "unico", activo: false }
            };
          }
        }
      }
    });
    corte.tizada[indexTizada] = {
      ...corte.tizada[indexTizada],
      talles: newTalle
    };
    setCorte({ ...corte });
  };
  const handleAddEncimado = e => {
    e.preventDefault();
    let nuevoEncimado = {
      color: "",
      cantidad: "",
      metros: "",
      kilos: ""
    };

    corte.tizada[e.currentTarget.dataset.index] = {
      ...corte.tizada[e.currentTarget.dataset.index],
      encimados: [
        ...corte.tizada[e.currentTarget.dataset.index].encimados,
        nuevoEncimado
      ]
    };

    setCorte({ ...corte, tizada: [...corte.tizada] });
  };
  const handleDeleteEncimado = e => {
    let index = e.currentTarget.dataset.index;
    let encimado = e.currentTarget.dataset.encimado;
    let nuevoEncimado = [
      ...corte.tizada[e.currentTarget.dataset.index].encimados
    ];
    nuevoEncimado.splice(encimado, 1);

    corte.tizada[index] = {
      ...corte.tizada[e.currentTarget.dataset.index],
      encimados: nuevoEncimado
    };
    setCorte({ ...corte, tizada: [...corte.tizada] });
  };
  const handleEncimado = e => {
    let value = e.target.value;
    let name = e.target.name;
    let index = e.target.dataset.index;
    let encimado = e.target.dataset.encimado;

    corte.tizada[index].encimados[encimado] = {
      ...corte.tizada[index].encimados[encimado],
      [name]: value
    };
    
    setCorte({ ...corte });
  };

  return (
    <Col sm="12" md="12" className="FormularioTela">
      <h1>Realizar corte</h1>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Tizada</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-3">
            <Row form>
              <Col md="1" className="form-group">
                <label>Corte</label>
                <FormInput
                  type="number"
                  value={corte.numero}
                  placeholder="numero"
                  name="numero"
                  required
                  invalid={corte.numero === "" ? true : false}
                  valid={corte.numero === "" ? false : true}
                  onChange={handlePrincipal}
                />
                <FormFeedback>Complete</FormFeedback>
              </Col>
              <Col md="2" className="form-group">
                <label>Fecha</label>
                <FormInput
                  type="date"
                  value={corte.fecha}
                  placeholder="Fecha"
                  name="fecha"
                  required
                  invalid={corte.fecha === "" ? true : false}
                  valid={corte.fecha === "" ? false : true}
                  onChange={handlePrincipal}
                />
                <FormFeedback>Complete</FormFeedback>
              </Col>
              <Col md="2" className="form-group">
                <label>Encimador</label>
                <FormInput
                  value={corte.encimador}
                  placeholder="Encimador"
                  name="encimador"
                  required
                  invalid={corte.encimador === "" ? true : false}
                  valid={corte.encimador === "" ? false : true}
                  onChange={handlePrincipal}
                />
                <FormFeedback>Complete</FormFeedback>
              </Col>
              <Col md="2" className="form-group">
                <label>Cortador</label>
                <FormInput
                  value={corte.cortador}
                  placeholder="Cortador"
                  name="cortador"
                  required
                  invalid={corte.cortador === "" ? true : false}
                  valid={corte.cortador === "" ? false : true}
                  onChange={handlePrincipal}
                />
                <FormFeedback>Complete</FormFeedback>
              </Col>
              <Col md="2" className="form-group">
                <label>Textilera </label>
                <FormInput
                  value={corte.textilera}
                  placeholder="Textilera"
                  name="textilera"
                  required
                  invalid={corte.textilera === "" ? true : false}
                  valid={corte.textilera === "" ? false : true}
                  onChange={handlePrincipal}
                />
                <FormFeedback>Complete</FormFeedback>
              </Col>
              <Col md="2" className="form-group">
                <label>Tela</label>
                <FormInput
                  value={corte.tela}
                  placeholder="Tela"
                  name="tela"
                  required
                  invalid={corte.tela === "" ? true : false}
                  valid={corte.tela === "" ? false : true}
                  onChange={handlePrincipal}
                />
                <FormFeedback>Complete</FormFeedback>
              </Col>
              <Col md="1" className="form-group">
                <label>Agregar </label>
                <Button className="botonIcons" onClick={handleAddTizada}>
                  <i className="material-icons">add</i>
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
        {corte.tizada.map((tizada, index) => (
          <FormularioCorte
            key={index}
            index={index}
            handleDeleteTizada={handleDeleteTizada}
            tizada={tizada}
            handleTalles={handleTalles}
            handleAddEncimado={handleAddEncimado}
            handleDeleteEncimado={handleDeleteEncimado}
            handleTizada={handleTizada}
            hadleEncimado={handleEncimado}
          />
        ))}
      </Card>
    </Col>
  );
}
