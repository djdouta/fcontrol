import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Document from "../../components/plancha/imprimir_comprobante";
import { PDFViewer } from "@react-pdf/renderer";

export default function EnviarPlancha() {
  const [data, setData] = useState({ prueba: "hola" });
  useEffect(() => {
    ReactDOM.render(
      <PDFViewer className="enviarPlancharPDFViewer">
        <Document data={data} />
      </PDFViewer>,
      document.getElementById("pdf")
    );
  }, [data]);
  const cambiar = e => {
    setData({ prueba: e.target.value });
  };
  return (
    <div>
      <input value={data.prueba} onChange={cambiar}></input>
      <div style={{ with: "30px" }} id="pdf"></div>
      {/* <div>
        <PDFDownloadLink document={<Document />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </div> */}
    </div>
  );
}
