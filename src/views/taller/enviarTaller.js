import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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

import axios from "axios";
import Autosugerir from "../../components/common/autocompletar";
import moment from "moment";
import FormularioTaller from "../../components/common/FormularioCorteTaller";
import { PDFViewer } from "@react-pdf/renderer";
import Document from "../../components/taller/imprimir_comprobante";

export default function EnviarTaller() {
  const [original, setOriginal] = useState([]);
  const [cortes, setCorte] = useState([]);
  const [stock, setStock] = useState();
  const [taller, setTaller] = useState({
    numero: "",
    encimador: "",
    fecha: "",
    cortador: "",
    textilera: "",
    tela: "",
    temporada: "",
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
            activo: false
          }
        },
        encimados: [
          {
            color: "",
            cantidad_stock: "",
            metros_stock: "",
            cantidad: "",
            metros: "",
            kilos: "",
            kilos_stock: ""
          }
        ]
      }
    ]
  });
  const [suggestions, setSuggestions] = useState([]);
  const [temporizador, setTemporizador] = useState(null);

  //Busqueda api rest
  const searchCut = async code => {
    const cut = await axios("/corte/find", {
      params: {
        id: code
      }
    });

    return cut;
  };
  const [data] = useState({ prueba: "hola" });
  useEffect(() => {
    ReactDOM.render(
      <PDFViewer className="enviarPlancharPDFViewer">
        <Document data={data} />
      </PDFViewer>,
      document.getElementById("pdf")
    );
  }, [data]);
  // const cambiar = e => {
  //   setData({ prueba: e.target.value });
  // };
  const onSuggestionsFetchRequested = async ({ value }) => {
    if (temporizador !== null) {
      window.clearTimeout(temporizador);
    }

    let temporizadorID = window.setTimeout(async () => {
      let newSuggestion = await getSuggestions(value);
      setSuggestions(newSuggestion);
    }, 200);
    setTemporizador(temporizadorID);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const getSuggestions = async value => {
    const result = await searchCut(value);
    console.log(result);
    setCorte([...result.data]);
    let nuevo = result.data.map(element => {
      return { name: element.numero };
    });
    return nuevo;
  };
  const handleAuto = (event, { newValue }) => {
    setTaller({
      ...taller,
      numero: newValue
    });
  };

  const getSuggestionValue = suggestion => {
    acceptCut(suggestion.name);
    return suggestion.name;
  };

  const acceptCut = cut => {
    let corte = cortes.find(c => c.numero === cut);
    corte.fecha = moment(corte.fecha).format("YYYY-MM-DD");
    setTaller(corte);
    setOriginal(corte);
    iniciarStock(corte);
  };
  const iniciarStock = corte => {
    let t = corte.tizada.map((tizada, index) => {
      let e = tizada.encimados.map(encimado => {
        return {
          ...encimado,
          cantidad_stock: 0,
          metros_stock: 0,
          kilos_stock: 0
        };
      });
      return {
        ...tizada,
        encimados: e
      };
    });
    let nuevoStock = {
      ...corte,
      tizada: t
    };

    setStock(nuevoStock);
  };
  const handleEncimado = e => {
    let value = e.target.value;
    let index = e.target.dataset.index;
    let encimadoIndex = e.target.dataset.encimado;
    let minimo =
      parseInt(original.tizada[index].encimados[encimadoIndex].cantidad_stock) <
      parseFloat(value)
        ? original.tizada[index].encimados[encimadoIndex].cantidad_stock
        : Math.round(value);

    const cantidadOriginal =
      original.tizada[index].encimados[encimadoIndex].cantidad_stock;
    const metrosOriginales =
      original.tizada[index].encimados[encimadoIndex].metros_stock;
    const kilosOriginales =
      original.tizada[index].encimados[encimadoIndex].kilos_stock;

    updateTaller(
      index,
      encimadoIndex,
      minimo,
      cantidadOriginal,
      metrosOriginales,
      kilosOriginales
    );
    updateStockCorte(
      index,
      encimadoIndex,
      minimo,
      cantidadOriginal,
      metrosOriginales,
      kilosOriginales
    );
  };
  const updateStockCorte = (
    index,
    encimadoIndex,
    minimo,
    cantidadOriginal,
    metrosOriginales,
    kilosOriginales
  ) => {
    let newTaller = stock.tizada[index].encimados[encimadoIndex];
    newTaller = {
      ...stock.tizada[index].encimados[encimadoIndex],
      cantidad_stock: cantidadOriginal - minimo,
      metros_stock:
        metrosOriginales - (metrosOriginales / cantidadOriginal) * minimo,
      kilos_stock:
        kilosOriginales - (kilosOriginales / cantidadOriginal) * minimo
    };

    let encimadoNew = immutableSplice(
      stock.tizada[index].encimados,
      encimadoIndex,
      1,
      newTaller
    );

    let newTizada = {
      ...stock.tizada[index],
      encimados: encimadoNew
    };

    let tizadaNew = immutableSplice(stock.tizada, index, 1, newTizada);
    setStock({ ...stock, tizada: tizadaNew });
  };

  const updateTaller = (
    index,
    encimadoIndex,
    minimo,
    cantidadOriginal,
    metrosOriginales,
    kilosOriginales
  ) => {
    let newTaller = taller.tizada[index].encimados[encimadoIndex];
    newTaller = {
      ...taller.tizada[index].encimados[encimadoIndex],
      cantidad: minimo,
      cantidad_stock: minimo,
      metros_stock: (metrosOriginales / cantidadOriginal) * minimo,
      metros: (metrosOriginales / cantidadOriginal) * minimo,
      kilos_stock: (kilosOriginales / cantidadOriginal) * minimo,
      kilos: (kilosOriginales / cantidadOriginal) * minimo
    };

    let encimadoNew = immutableSplice(
      taller.tizada[index].encimados,
      encimadoIndex,
      1,
      newTaller
    );

    let newTizada = {
      ...taller.tizada[index],
      encimados: encimadoNew
    };

    let tizadaNew = immutableSplice(taller.tizada, index, 1, newTizada);
    setTaller({ ...taller, tizada: tizadaNew });
  };

  const immutableSplice = (arr, start, deleteCount, ...items) => {
    return [
      ...arr.slice(0, start),
      ...items,
      ...arr.slice(start + deleteCount)
    ];
  };
  const handleTalles = e => {
    e.preventDefault();
  };

  const registarCorte = async () => {
    modificarStockCorte();
    // const response = await axios.post("/taller", taller);
    // if (response.status === 200) {
    //   modificarStockCorte();
    // }
  };
  const modificarStockCorte = async () => {
    const response = await axios.patch(
      "/corte",
      {
        tizada: stock.tizada
      },
      {
        params: {
          id: stock._id
        }
      }
    );
    console.log(response);
  };
  return (
    <Col sm="12" md="12" className="FormularioTela">
      <h1>Enviar al taller</h1>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <Row form>
            <Col md="2" className="form-group">
              <label>Numero de corte</label>
              <Autosugerir
                getSuggestionValue={getSuggestionValue}
                handleAuto={handleAuto}
                value={taller.numero}
                index={0}
                suggestions={suggestions}
                getSuggestions={getSuggestions}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                name="numero"
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
            <Col md="1" className="form-group">
              <label>Buscar</label>
              <Button onClick={() => acceptCut(taller.numero)}>Aceptar</Button>
            </Col>
          </Row>
        </CardHeader>
        <div>
          <ListGroup flush>
            <ListGroupItem className="px-3">
              <Row form>
                <Col md="2" className="form-group">
                  <label>Fecha</label>
                  <FormInput
                    type="date"
                    readOnly={true}
                    value={taller.fecha}
                    placeholder="Fecha"
                    name="fecha"
                    required
                    //   invalid={corte.fecha === "" ? true : false}
                    //   valid={corte.fecha === "" ? false : true}
                  />
                </Col>
                <Col md="2" className="form-group">
                  <label>Encimador</label>
                  <FormInput
                    readOnly={true}
                    value={taller.encimador}
                    placeholder="Encimador"
                    name="encimador"
                    required
                    //   invalid={corte.encimador === "" ? true : false}
                    //   valid={corte.encimador === "" ? false : true}
                  />
                  <FormFeedback>Complete</FormFeedback>
                </Col>
                <Col md="2" className="form-group">
                  <label>Cortador</label>
                  <FormInput
                    readOnly={true}
                    value={taller.cortador}
                    placeholder="Cortador"
                    name="cortador"
                    required
                    // invalid={data.cortador === "" ? true : false}
                    // valid={data.cortador === "" ? false : true}
                  />
                  <FormFeedback>Complete</FormFeedback>
                </Col>
                <Col md="2" className="form-group">
                  <label>Temporada</label>
                  <FormInput
                    readOnly={true}
                    value={taller.temporada}
                    placeholder="Temporada"
                    name="temporada"
                    required
                    //   invalid={corte.textilera === "" ? true : false}
                    //   valid={corte.textilera === "" ? false : true}
                  />
                </Col>
                <Col md="2" className="form-group">
                  <label>Textilera </label>
                  <FormInput
                    readOnly={true}
                    value={taller.textilera}
                    placeholder="Textilera"
                    name="textilera"
                    required
                    //   invalid={corte.textilera === "" ? true : false}
                    //   valid={corte.textilera === "" ? false : true}
                  />
                  <FormFeedback>Complete</FormFeedback>
                </Col>
                <Col md="2" className="form-group">
                  <label>Tela</label>
                  <FormInput
                    readOnly={true}
                    value={taller.tela}
                    placeholder="Tela"
                    name="tela"
                    //   required
                    //   invalid={corte.tela === "" ? true : false}
                    //   valid={corte.tela === "" ? false : true}
                  />
                  <FormFeedback>Complete</FormFeedback>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
          {taller.tizada.map((tizada, index) => (
            <FormularioTaller
              readOnly={true}
              key={index}
              index={index}
              tizada={tizada}
              handleTalles={handleTalles}
              handleEncimado={handleEncimado}
              original={original}
              // limit={original.tizada[index]}
            />
          ))}
          <ListGroup flush>
            <ListGroupItem className="px-3">
              <span className="FormValidationIngresarIzquierda">
                <Button onClick={registarCorte}>Enviar al taller</Button>
              </span>
              <span className="FormValidationIngresarDerecha">
                <Button>Crear planilla de envio al taller </Button>
              </span>
            </ListGroupItem>
          </ListGroup>

          <div className="enviarPlancharPDFViewerCanvas" id="pdf"></div>
        </div>
      </Card>
    </Col>
  );
}
