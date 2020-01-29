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
  Button,
  FormSelect
} from "shards-react";
import FormularioCorte from "../../components/common/FormularioCorteTaller";
import ConjuntoRemito from "../../components/common/ConjuntoRemito";
import axios from "axios";

export default function Corte() {
  const [corte, setCorte] = useState({
    numero: "",
    encimador: "",
    fecha: "",
    cortador: "",
    conjuntoRemito: [
      {
        remito: "",
        textilera: "",
        tela: ""
      }
    ],
    temporada: "invierno",
    tizada: [
      {
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
        encimados: [
          {
            conjunto: 0,
            color: "",
            cantidad: "",
            metros: "",
            kilos: "",
            sobra: "",
            falta: ""
          }
        ]
      }
    ]
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios("/corte");
  //     console.log(result);
  //     // setCorte(result.data);
  //   };
  //   fetchData();
  // }, []);

  const handlePrincipal = e => {
    let name = e.target.name;
    let value = e.target.value;
    setCorte({ ...corte, [name]: value });
  };
  const handleAddRemitoConjunto = e => {
    let newConjunto = {
      remito: "",
      textilera: "",
      tela: ""
    };
    setCorte({
      ...corte,
      conjuntoRemito: [...corte.conjuntoRemito, newConjunto]
    });
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
    e.preventDefault();
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
      conjunto: 0,
      color: "",
      cantidad: "",
      metros: "",
      kilos: "",
      cantidad_stock: "",
      metros_stock: "",
      kilos_stock: ""
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
      [name]: value,
      [`${name}_stock`]: value
    };
    setCorte({ ...corte });
  };

  const registarCorte = () => {
    axios.post(`/corte`, corte).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  const handleOpcionChange = e => {
    let encimado = e.target.dataset.encimado;
    let index = e.target.dataset.index;
    let conjunto = e.target.dataset.conjunto;
    let nuevoEncimado = (corte.tizada[index].encimados[encimado] = {
      ...corte.tizada[index].encimados[encimado],
      conjunto
    });
    let encimadoNew = immutableSplice(
      corte.tizada[index].encimados,
      encimado,
      1,
      nuevoEncimado
    );
    let newTizada = {
      ...corte.tizada[index],
      encimados: encimadoNew
    };

    let tizadaNew = immutableSplice(corte.tizada, index, 1, newTizada);
    setCorte({ ...corte, tizada: tizadaNew });
  };

  const handleChangeRemitoConjunto = e => {
    let conjuntoIndex = e.target.dataset.index;
    let name = e.target.name;
    let value = e.target.value;
    let nuevoConjunto = {
      ...corte.conjuntoRemito[conjuntoIndex],
      [name]: value
    };
    let newEncimadoConjunto = immutableSplice(
      corte.conjuntoRemito,
      conjuntoIndex,
      1,
      nuevoConjunto
    );
    setCorte({ ...corte, conjuntoRemito: newEncimadoConjunto });
  };

  const handleDeleteRemitoConjunto = e => {
    let dataSetIndex = e.target.dataset.index;
    let newData = corte.conjuntoRemito.filter(
      (c, i) => i !== parseInt(dataSetIndex)
    );
    setCorte({
      ...corte,
      conjuntoRemito: newData
    });
  };

  const immutableSplice = (arr, start, deleteCount, ...items) => {
    return [
      ...arr.slice(0, start),
      ...items,
      ...arr.slice(start + deleteCount)
    ];
  };
  return (
    <Col sm="12" md="12" className="FormularioTela">
      <h1>Realizar corte</h1>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <Row form>
            {/* <h6 className="m-0">Tizada</h6>
            <Button className="botonIcons" onClick={handleAddTizada}>
              <i className="material-icons">add</i>
            </Button> */}
            <Col md="2" className="form-group">
              <label>Agregar tizada </label>
              <Button className="botonIcons" onClick={handleAddTizada}>
                <i className="material-icons">add</i>
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-3">
            <Row form>
              <Col md="2" className="form-group">
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
                <label>Temporada</label>
                <FormSelect onChange={handlePrincipal} valid name="temporada">
                  <option value="invierno">Invierno</option>
                  <option value="verano">Verano</option>
                </FormSelect>
              </Col>
              <Col md="2" className="form-group">
                <label>Agregar Conjunto </label>
                <Button
                  className="botonIcons"
                  onClick={handleAddRemitoConjunto}
                >
                  <i className="material-icons">add</i>
                </Button>
              </Col>
            </Row>

            {corte.conjuntoRemito.map((conjunto, index) => (
              <ConjuntoRemito
                key={index}
                textilera={conjunto.textilera}
                tela={conjunto.tela}
                remito={conjunto.remito}
                handleAddRemitoConjunto={handleAddRemitoConjunto}
                handleChangeRemitoConjunto={handleChangeRemitoConjunto}
                index={index}
                handleDeleteRemitoConjunto={handleDeleteRemitoConjunto}
              />
            ))}
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
            handleEncimado={handleEncimado}
            handleOpcionChange={handleOpcionChange}
            conjunto={corte.conjuntoRemito}
          />
        ))}
        <ListGroup flush>
          <ListGroupItem className="px-3">
            <span className="FormValidationIngresarIzquierda">
              <Button onClick={registarCorte}>Registar corte </Button>
            </span>
            <span className="FormValidationIngresarDerecha">
              <Button>Crear planilla de corte </Button>
            </span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Col>
  );
}
