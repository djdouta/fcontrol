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
  FormSelect,
  FormCheckbox
} from "shards-react";
import FormularioCorte from "../../components/common/FormularioCorteTaller";
import ConjuntoRemito from "../../components/common/ConjuntoRemito";
import axios from "axios";

export default function Corte() {
  const [corte, setCorte] = useState({
    mismaTela: false,
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
        talles: [],
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
  //State para  reconcocer todos los remitos existentes
  const [multiRemitos, setMultiRemito] = useState([[]]);
  const [multiTextilera, setMultiTextilera] = useState([[]]);
  const [multiTela, setMultiTela] = useState([[]]);

  const stockTela = useState({});

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

    setMultiTextilera([...multiTextilera, []]);
    setMultiTela([...multiTela, []]);
    setMultiRemito([...multiRemitos, []]);
  };
  const handleAddTizada = () => {
    let nuevaTizada = {
      articulo: "",
      modelo: "",
      referencia: "",
      largo: "",
      ancho: "",
      talles: [],
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
    let oldTalle = corte.tizada[indexTizada].talles;
    oldTalle = [...oldTalle, valor];

    let newTizada = immutableSplice(corte.tizada, indexTizada, 1, {
      ...corte.tizada[indexTizada],
      talles: oldTalle
    });
    setCorte({ ...corte, tizada: newTizada });
  };
  const handleDeleteTalles = e => {
    let index = e.target.dataset.index;

    let newTalles = immutablePop(corte.tizada[index].talles);

    let newTizada = immutableSplice(corte.tizada, index, 1, {
      ...corte.tizada[index],
      talles: newTalles
    });
    setCorte({ ...corte, tizada: newTizada });
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
      kilos_stock: "",
      sobra: "",
      falta: ""
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
  const immutablePop = arr => {
    return arr.slice(0, -1);
  };
  const handleAuto = (
    event,
    { newValue },
    { index },
    { tipo },
    { id },
    { data }
  ) => {
    let conjunto = corte.conjuntoRemito[index];
    const agregarPorConjunto = () => {
      let newEncimadoConjunto = immutableSplice(
        corte.conjuntoRemito,
        index,
        1,
        conjunto
      );
      setCorte({
        ...corte,
        conjuntoRemito: newEncimadoConjunto
      });
    };

    switch (tipo) {
      case "remito":
        let remitos = data.filter(e => e.remito === newValue);
        setMultiRemito(immutableSplice(multiRemitos, index, 1, remitos));
        setMultiTextilera(immutableSplice(multiTextilera, index, 1, []));
        setMultiTela(immutableSplice(multiTela, index, 1, []));

        conjunto = {
          ...conjunto,
          [tipo]: newValue,
          textilera: "",
          tela: ""
        };
        agregarPorConjunto();

        break;
      case "textilera":
        let textileras = data.filter(
          e =>
            e.textilera === newValue &&
            corte.conjuntoRemito[index].remito === e.remito
        );

        setMultiTextilera(
          immutableSplice(multiTextilera, index, 1, textileras)
        );
        setMultiTela(immutableSplice(multiTela, index, 1, []));
        conjunto = {
          ...conjunto,
          tela: "",
          [tipo]: newValue
        };
        agregarPorConjunto();

        break;
      case "tela":
        let telas = data.find(
          e =>
            corte.conjuntoRemito[index].remito === e.remito &&
            corte.conjuntoRemito[index].textilera === e.textilera
        );

        let newTela = {
          _id: telas._id,
          fecha: telas.fecha,
          fecha_remito: telas.fecha_remito,
          remito: telas.remito,
          textilera: telas.textilera,
          tela: telas.datos.filter(e => e.tipo === newValue)
        };

        let newMultiTela = newTela.tela === undefined ? [] : newTela;
        setMultiTela(immutableSplice(multiTela, index, 1, newMultiTela));

        conjunto = {
          ...conjunto,
          [tipo]: newValue
        };
        agregarPorConjunto();
        break;
      case "color":
        let newEnciamdo = {
          ...corte.tizada[index.index].encimados[index.encimadoIndex],
          color: newValue
        };
        let encimados = immutableSplice(
          corte.tizada[index.index].encimados,
          index.encimadoIndex,
          1,
          newEnciamdo
        );
        let newTizadas = immutableSplice(corte.tizada, index.index, 1, {
          ...corte.tizada[index.index],
          encimados: encimados
        });
        setCorte({ ...corte, tizada: newTizadas });
        break;
      default:
        break;
    }
  };

  const handleOrginal = original => {
    console.log(original);
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
            <Col md="3">
              <Row form>
                <Col md="2">
                  <Button
                    className="botonIconsTizada"
                    onClick={handleAddTizada}
                  >
                    <i className="material-icons">add</i>
                  </Button>
                </Col>
                <Col md="10">
                  <label>Agregar tizada </label>
                </Col>
              </Row>
            </Col>
            <Col md="3">
              <Row form>
                <Col md="2">
                  <FormCheckbox
                    className="botonCheckBox"
                    // onClick={handleAddTizada}
                  ></FormCheckbox>
                </Col>
                <Col md="10">
                  <label>¿Se utilizó la misma tela?</label>
                </Col>
              </Row>
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
                readOnly={true}
                multiRemitos={multiRemitos}
                multiTextilera={multiTextilera}
                handleOrginal={handleOrginal}
                handleAuto={handleAuto}
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
            handleDeleteTalles={handleDeleteTalles}
            readOnly={false}
            multiTela={multiTela}
            key={index}
            index={index}
            handleDeleteTizada={handleDeleteTizada}
            tizada={tizada}
            handleAuto={handleAuto}
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
