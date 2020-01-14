import React, { useState } from "react";
import { Button } from "shards-react";
import no_file from "../../images/file-manager/no_file.png";
import no_factura from "../../images/file-manager/no_factura.jpg";
import "../../assets/components/FromValidation.css";
import { PdfDocument } from "../../components/tela/impresion_tela";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FormularioTela from "../../components/tela/formulario_tela";
import axios from "axios";

function Impresar() {
  const [telaImagen, setTelaImagen] = useState([]);
  const [facturaImagen, setFacturaImagen] = useState([]);
  const [inputs, setInputs] = useState({
    fecha: "2010-08-20",
    fecha_remito: "2019-08-05",
    remito: "20654",
    textilera: "Sin titulo",
    datos: [
      {
        color: "Rojo",
        tipo: "vengalina",
        descripcion: "Descripcion",
        textilera: "Textilera 1",
        metros: "30",
        rollos: "5",
        codigo: "415015521",
        estampado: false,
        mostrar: true,
        telaImagen: no_file,
        factura: no_factura
      },
      {
        color: "Verde",
        tipo: "vengalina",
        descripcion: "Descripcion 2",
        textilera: "Textilera 2",
        metros: "300",
        rollos: "50",
        codigo: "asd232",
        estampado: true,
        mostrar: true,
        telaImagen: no_file,
        factura: no_factura
      }
    ]
  });
  const [pdf, setPdf] = useState(null);
  const [pdfShow, setPdfShow] = useState(true);

  const handleChangeData = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const tag = target.attributes.getNamedItem("data-tag").value;
    let datos = inputs.datos[tag];
    datos = {
      ...datos,
      [name]: value
    };
    inputs.datos[tag] = datos;
    setInputs({
      ...inputs
    });
  };
  const handleAuto = (event, { newValue }, { index }, { tipo }) => {
    let datos = inputs.datos[index];
    datos = {
      ...datos,
      [tipo]: newValue
    };
    inputs.datos[index] = datos;
    setInputs({
      ...inputs
    });
  };
  const handleChangeInput = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs({
      ...inputs,
      [name]: value
    });
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
          metros: "",
          rollos: "",
          codigo: "",
          estampado: inputs.datos[inputs.datos.length - 1].estampado,
          mostrar: true,
          telaImagen: no_file
        }
      ]
    };
    setInputs(nuevoInput);
  };

  const handleClikEliminar = e => {
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
            textilera: "",
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
  return (
    <React.Fragment>
      {inputs.datos.map((data, index) => (
        <FormularioTela
          key={index}
          handleChangeInput={handleChangeInput}
          handleChangeData={handleChangeData}
          handleAuto={handleAuto}
          textilera={inputs.textilera}
          fecha_remito={inputs.fecha_remito}
          fecha={inputs.fecha}
          remito={inputs.remito}
          index={index}
          data={data}
          handleChekbox={handleChekbox}
          handleClik={handleClikEliminar}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      ))}
      <span className="FormValidationIngresarIzquierda">
        <Button onClick={showPDF}>Generar Pdf</Button>
        {pdf}
      </span>

      <span className="FormValidationIngresarDerecha">
        <Button onClick={addForm}>Ingresar y mantener</Button>
        <Button onClick={agregarTela}>Ingresar</Button>
      </span>
    </React.Fragment>
  );
}
export default Impresar;
