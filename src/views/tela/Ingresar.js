import React, { useState } from "react";
import {
  Button,
  Col,
  Card,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Row,
  FormInput,
  FormFeedback
} from "shards-react";
import no_file from "../../images/file-manager/no_file.png";
import no_factura from "../../images/file-manager/no_factura.jpg";
import "../../assets/components/FromValidation.css";
import { PdfDocument } from "../../components/tela/impresion_tela";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FormularioTela from "../../components/tela/formulario_tela";
import axios from "axios";
import Autosugerir from "../../components/common/autocompletar";

function Impresar() {
  const [telaImagen, setTelaImagen] = useState([]);
  const [facturaImagen, setFacturaImagen] = useState([]);
  const [inputs, setInputs] = useState({
    fecha: "",
    fecha_remito: "",
    remito: "",
    textilera: "",
    datos: [
      {
        color: "",
        tipo: "",
        descripcion: "",
        temporada: "invierno",
        metros: "",
        rollos: "",
        codigo: "",
        estampado: false,
        mostrar: true,
        telaImagen: no_file,
        factura: no_factura
      }
    ]
  });
  const [pdf, setPdf] = useState(null);
  const [pdfShow, setPdfShow] = useState(true);
  const [temporizador, setTemporizador] = useState(null);
  const [suggestionsTextilera, setSuggestionsTextilera] = useState([]);
  const [idCodigo, setIdCodigo] = useState({
    textilera: "",
    restos: [
      {
        color: "",
        tipo: ""
      }
    ]
  });

  //Busqueda api rest
  const searchTextilera = async code => {
    const textilera = await axios("/textileraTela/find", {
      params: {
        nombre: code
      }
    });

    return textilera;
  };

  const handleChangeData = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const tag = target.attributes.getNamedItem("data-tag").value;
    let datos = inputs.datos[tag];
    if (name === "metros" || name === "rollos") {
      datos = {
        ...datos,
        [name]: value,
        [`${name}_stock`]: value
      };
    } else {
      datos = {
        ...datos,
        [name]: value
      };
    }
    inputs.datos[tag] = datos;
    setInputs({
      ...inputs
    });
  };

  const handleChangeInput = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (target.name === "remito") {
      let newData = inputs.datos.map((e, i) => {
        return {
          ...e,
          codigo: `${value}${idCodigo.textilera}${idCodigo.restos[i].tipo}${idCodigo.restos[i].color}`
        };
      });

      setInputs({
        ...inputs,
        remito: value,
        datos: newData
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value
      });
    }
  };

  const handleClick = ({ target }) => {
    let padre = target.parentNode.children;
    padre[0].click();
  };

  const handleChekbox = () => {
    let estampado = !inputs.estampado;
    setInputs({
      ...inputs,
      estampado
    });
  };

  const showPDF = () => {
    let newPdf =
      pdfShow === true ? (
        <PDFDownloadLink
          document={<PdfDocument inputs={inputs} />}
          fileName="ingresoTela.pdf"
          style={{
            border: "1px solid #006fe6",
            padding: "10px"
          }}
        >
          {({ blob, url, loading, error }) => {
            return loading ? "Cargando..." : "Descargar reporte";
          }}
        </PDFDownloadLink>
      ) : null;
    setPdfShow(!pdfShow);
    setPdf(newPdf);
  };

  const addForm = e => {
    e.preventDefault();
    let ocultador = inputs.datos.map(input => {
      return {
        ...input,
        mostrar: false
      };
    });
    let nuevoInput = {
      ...inputs,
      datos: [
        ...ocultador,
        {
          color: "",
          tipo: inputs.datos[inputs.datos.length - 1].tipo,
          descripcion: inputs.datos[inputs.datos.length - 1].descripcion,
          textilera: inputs.datos[inputs.datos.length - 1].textilera,
          metros: "",
          rollos: "",
          codigo: `${inputs.remito}${inputs.textilera}${
            idCodigo.restos[idCodigo.restos.length - 1].tipo
          }`,
          estampado: inputs.datos[inputs.datos.length - 1].estampado,
          mostrar: true,
          telaImagen: no_file,
          factura: no_factura
        }
      ]
    };
    setInputs(nuevoInput);
    let newId = {
      ...idCodigo,
      restos: [
        ...idCodigo.restos,
        { color: "", tipo: idCodigo.restos[idCodigo.restos.length - 1].tipo }
      ]
    };
    console.log(idCodigo.restos[idCodigo.restos.length - 1].tipo);
    setIdCodigo(newId);
  };

  const handleShow = e => {
    e.preventDefault();
    const tag = e.target.attributes.getNamedItem("data-tag").value;
    let datos = inputs.datos[tag];
    datos = {
      ...datos,
      mostrar: !inputs.datos[tag].mostrar
    };
    inputs.datos[tag] = datos;
    setInputs({
      ...inputs
    });
  };

  const handleChange = ({ target }) => {
    if (target.files && target.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        const tag = target.attributes.getNamedItem("data-tag").value;
        const imagen = target.attributes.getNamedItem("data-imagen").value;
        let datos = inputs.datos[tag];
        datos = {
          ...datos,
          [imagen]: e.target.result
        };

        inputs.datos[tag] = datos;
        setInputs({
          ...inputs
        });

        if (imagen === "factura") {
          facturaImagen[tag] = target.files[0];
          setFacturaImagen([...facturaImagen]);
        } else if (imagen === "telaImagen") {
          telaImagen[tag] = target.files[0];
          setTelaImagen([...telaImagen]);
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  };

  const agregarTela = () => {
    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    telaImagen.forEach(element => {
      formData.append("tela", element);
    });
    facturaImagen.forEach(element => {
      formData.append("factura", element);
    });
    let newData = inputs.datos.map(e => {
      let nuevo = { ...e, factura: "", telaImagen: "", mostrar: "" };
      return nuevo;
    });
    let parseado = { ...inputs, datos: newData };
    parseado = JSON.stringify(inputs);
    formData.append("data", parseado);
    axios.post("/tela", formData, config).then(res => {
      setInputs({
        fecha: "",
        fecha_remito: "",
        remito: "",
        textilera: "",
        datos: [
          {
            color: "",
            tipo: "",
            descripcion: "",
            temporada: "",
            metros: "",
            rollos: "",
            codigo: "",
            estampado: false,
            mostrar: true,
            telaImagen: no_file,
            factura: no_factura
          }
        ]
      });
    });
  };

  //Autogest
  const getSuggestionsTextilera = async value => {
    const result = await searchTextilera(value);
    let nuevo = result.data.map(element => {
      return {
        id: element.id,
        name: element.name
      };
    });
    return nuevo;
  };
  const onSuggestionsFetchRequestedTextilera = async ({ value }) => {
    if (temporizador !== null) {
      window.clearTimeout(temporizador);
    }
    let temporizadorID = window.setTimeout(async () => {
      let newSuggestion = await getSuggestionsTextilera(value);

      setSuggestionsTextilera(newSuggestion);
    }, 200);
    setTemporizador(temporizadorID);
  };

  const onSuggestionsClearRequestedTextilera = () => {
    setSuggestionsTextilera([]);
  };
  const getSuggestionValue = suggestion => {
    return suggestion.name;
  };
  //fin de autocompletar
  console.log("hola mudno");
  const handleAuto = (event, { newValue }, { index }, { tipo }, { id }) => {
    if (id.length === 0) {
      if (tipo === "textilera") {
        setInputs({
          ...inputs,
          [tipo]: newValue
        });
      } else {
        let datos = inputs.datos[index];
        datos = {
          ...datos,
          [tipo]: newValue
        };
        let newDatos = immutableSplice(inputs.datos, index, 1, datos);
        setInputs({ ...inputs, datos: newDatos });
      }
    } else {
      if (tipo === "textilera") {
        let element = id.find(e => e.name === newValue);

        let newId = {
          textilera: element !== undefined ? element.id : "",
          restos: idCodigo.restos
        };
        setIdCodigo(newId);
        let newData = inputs.datos.map((e, i) => {
          return {
            ...e,
            codigo: `${inputs.remito}${newId.textilera}${idCodigo.restos[i].tipo}${idCodigo.restos[i].color}`
          };
        });

        setInputs({ ...inputs, datos: newData, textilera: newValue });
      } else {
        let resto = idCodigo.restos[index];
        let element = id.find(e => e.name === newValue);
        resto = {
          ...resto,
          [tipo]: element !== undefined ? element.id : ""
        };

        let newRestos = immutableSplice(idCodigo.restos, index, 1, resto);
        setIdCodigo({ ...idCodigo, restos: newRestos });

        let codigo = buscarCodigo(
          element !== undefined ? element.id : "",
          tipo,
          index
        );

        let newdata = inputs.datos[index];
        newdata = {
          ...newdata,
          codigo,
          [tipo]: newValue
        };
        let newDatos = immutableSplice(inputs.datos, index, 1, newdata);
        setInputs({ ...inputs, datos: newDatos });
      }
    }
  };

  const handleDelete = e => {
    e.preventDefault();
    const index = e.target.attributes.getNamedItem("data-index").value;
    let restos = inputs.datos.filter((dato, i) => {
      return `${i}` !== index;
    });
    let newid = idCodigo.restos.filter((dato, i) => {
      return `${i}` !== index;
    });
    console.log(newid);
    setIdCodigo({ ...idCodigo, restos: newid });
    setInputs({ ...inputs, datos: restos });
  };

  const buscarCodigo = (id, tipo, index) => {
    let codigo = "";

    if (tipo === "color") {
      codigo = `${inputs.remito}${idCodigo.textilera}${idCodigo.restos[index].tipo}${id}`;
    } else {
      codigo = `${inputs.remito}${idCodigo.textilera}${id}${idCodigo.restos[index].color}`;
    }

    return codigo;
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
      <h1>Ingresar tela</h1>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <Row form>
            <h5 className="mr-2">Datos generales</h5>
          </Row>
          <Row form>
            <Col md="3" className="form-group">
              <label>Textilera</label>
              <Autosugerir
                handleAuto={handleAuto}
                value={inputs.textilera}
                index={0}
                suggestions={suggestionsTextilera}
                getSuggestions={getSuggestionsTextilera}
                onSuggestionsClearRequested={
                  onSuggestionsClearRequestedTextilera
                }
                onSuggestionsFetchRequested={
                  onSuggestionsFetchRequestedTextilera
                }
                getSuggestionValue={getSuggestionValue}
                name="textilera"
              />
            </Col>
            <Col md="3" className="form-group">
              <label>Fecha</label>
              <FormInput
                value={inputs.fecha}
                type="date"
                placeholder="Fecha"
                name="fecha"
                required
                invalid={inputs.fecha === "" ? true : false}
                valid={inputs.fecha === "" ? false : true}
                onChange={handleChangeInput}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
            <Col md="3" className="form-group">
              <label>Remito fecha</label>
              <FormInput
                value={inputs.fecha_remito}
                type="date"
                placeholder="Fecha remito"
                name="fecha_remito"
                required
                invalid={inputs.fecha_remito === "" ? true : false}
                valid={inputs.fecha_remito === "" ? false : true}
                onChange={handleChangeInput}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
            <Col md="3" className="form-group">
              <label>Remito</label>
              <FormInput
                value={inputs.remito}
                type="text"
                placeholder="Remito"
                name="remito"
                required
                invalid={inputs.remito === "" ? true : false}
                valid={inputs.remito === "" ? false : true}
                onChange={handleChangeInput}
              />
              <FormFeedback>Complete</FormFeedback>
            </Col>
          </Row>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-3">
            <Row form>
              {inputs.datos.map((data, index) => (
                <FormularioTela
                  key={index}
                  handleChangeData={handleChangeData}
                  handleAuto={handleAuto}
                  index={index}
                  data={data}
                  handleChekbox={handleChekbox}
                  handleShow={handleShow}
                  handleClick={handleClick}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                />
              ))}
            </Row>
          </ListGroupItem>
        </ListGroup>
        <CardFooter>
          <span className="FormValidationIngresarIzquierda">
            <Button onClick={showPDF}>Generar Pdf</Button>
            {pdf}
          </span>

          <span className="FormValidationIngresarDerecha">
            <Button onClick={addForm}>Ingresar y mantener</Button>
            <Button onClick={agregarTela}>Ingresar</Button>
          </span>
        </CardFooter>
      </Card>
    </Col>
  );
}
export default Impresar;
